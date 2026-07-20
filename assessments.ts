"use server"

import { db } from "@/lib/db"
import { assessments, clients, type Assessment, type Client } from "@/lib/db/schema"
import { computeScores } from "@/lib/scoring"
import type { Answers } from "@/lib/questionnaire"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export type ClientInput = {
  name: string
  gender?: string
  age?: number
  phone?: string
  email?: string
}

export async function createAssessment(clientInput: ClientInput, answers: Answers) {
  const result = computeScores(answers)

  // create client
  const [client] = await db
    .insert(clients)
    .values({
      name: clientInput.name,
      gender: clientInput.gender || null,
      age: clientInput.age ?? null,
      phone: clientInput.phone || null,
      email: clientInput.email || null,
    })
    .returning()

  const [assessment] = await db
    .insert(assessments)
    .values({
      clientId: client.id,
      answers,
      scores: result.scores,
      dominant: result.dominant,
      secondary: result.secondary,
      tertiary: result.tertiary,
      intensity: result.intensity,
      flags: result.flags,
    })
    .returning()

  revalidatePath("/dashboard")
  return { clientId: client.id, assessmentId: assessment.id }
}

// Add a follow-up assessment for an existing client
export async function addAssessmentForClient(clientId: number, answers: Answers) {
  const result = computeScores(answers)
  const [assessment] = await db
    .insert(assessments)
    .values({
      clientId,
      answers,
      scores: result.scores,
      dominant: result.dominant,
      secondary: result.secondary,
      tertiary: result.tertiary,
      intensity: result.intensity,
      flags: result.flags,
    })
    .returning()

  revalidatePath("/dashboard")
  revalidatePath(`/dashboard/${clientId}`)
  return { clientId, assessmentId: assessment.id }
}

export async function getClients(): Promise<(Client & { latestDominant: string | null; assessmentCount: number })[]> {
  const rows = await db.select().from(clients).orderBy(desc(clients.createdAt))
  const enriched = await Promise.all(
    rows.map(async (c) => {
      const list = await db
        .select()
        .from(assessments)
        .where(eq(assessments.clientId, c.id))
        .orderBy(desc(assessments.createdAt))
      return {
        ...c,
        latestDominant: list[0]?.dominant ?? null,
        assessmentCount: list.length,
      }
    }),
  )
  return enriched
}

export async function getClient(clientId: number): Promise<Client | null> {
  const [c] = await db.select().from(clients).where(eq(clients.id, clientId))
  return c ?? null
}

export async function getAssessmentsForClient(clientId: number): Promise<Assessment[]> {
  return db.select().from(assessments).where(eq(assessments.clientId, clientId)).orderBy(desc(assessments.createdAt))
}

export async function getAssessment(assessmentId: number): Promise<(Assessment & { client: Client }) | null> {
  const [a] = await db.select().from(assessments).where(eq(assessments.id, assessmentId))
  if (!a) return null
  const [c] = await db.select().from(clients).where(eq(clients.id, a.clientId))
  if (!c) return null
  return { ...a, client: c }
}

export async function updatePractitionerNotes(assessmentId: number, notes: string) {
  await db.update(assessments).set({ practitionerNotes: notes }).where(eq(assessments.id, assessmentId))
  revalidatePath("/dashboard")
}

export async function updateClientNotes(clientId: number, notes: string) {
  await db.update(clients).set({ notes }).where(eq(clients.id, clientId))
  revalidatePath(`/dashboard/${clientId}`)
}

export async function deleteClient(clientId: number) {
  await db.delete(assessments).where(eq(assessments.clientId, clientId))
  await db.delete(clients).where(eq(clients.id, clientId))
  revalidatePath("/dashboard")
}
