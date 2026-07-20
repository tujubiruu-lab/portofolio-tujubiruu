"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { QUESTIONS, type Answers } from "@/lib/questionnaire"
import { createAssessment } from "@/app/actions/assessments"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { QuestionCard } from "@/components/question-card"
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

type ClientInfo = {
  name: string
  gender: string
  age: string
  phone: string
  email: string
}

export function AssessmentFlow() {
  const router = useRouter()
  const [step, setStep] = useState(0) // 0 = client info, 1..15 = questions
  const [client, setClient] = useState<ClientInfo>({ name: "", gender: "", age: "", phone: "", email: "" })
  const [answers, setAnswers] = useState<Answers>({})
  const [isPending, startTransition] = useTransition()

  const totalSteps = QUESTIONS.length + 1
  const progress = (step / totalSteps) * 100

  const currentQuestion = step >= 1 ? QUESTIONS[step - 1] : null

  const setGroupAnswer = (groupId: string, values: string[]) => {
    setAnswers((prev) => ({ ...prev, [groupId]: values }))
  }

  const clientValid = client.name.trim().length > 1

  const currentAnswered = useMemo(() => {
    if (!currentQuestion) return true
    // require at least one answer per question (any group)
    return currentQuestion.groups.some((g) => (answers[g.id]?.length ?? 0) > 0)
  }, [currentQuestion, answers])

  const goNext = () => {
    if (step === 0 && !clientValid) {
      toast.error("Mohon isi nama klien terlebih dahulu.")
      return
    }
    if (step < totalSteps - 1) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      submit()
    }
  }

  const goBack = () => {
    if (step > 0) {
      setStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const submit = () => {
    startTransition(async () => {
      try {
        const { assessmentId } = await createAssessment(
          {
            name: client.name.trim(),
            gender: client.gender || undefined,
            age: client.age ? Number(client.age) : undefined,
            phone: client.phone || undefined,
            email: client.email || undefined,
          },
          answers,
        )
        router.push(`/result/${assessmentId}`)
      } catch (e) {
        console.log("[v0] submit error", e)
        toast.error("Terjadi kesalahan saat menyimpan asesmen.")
      }
    })
  }

  const isLast = step === totalSteps - 1

  return (
    <div className="animate-fade-up">
      <Toaster position="top-center" theme="dark" />

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{step === 0 ? "Data Klien" : `Pertanyaan ${step} dari ${QUESTIONS.length}`}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {step === 0 ? (
        <Card className="border-border bg-card backdrop-blur-md">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Data Klien</CardTitle>
            <CardDescription>Informasi ini akan tercantum pada laporan hasil asesmen.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nama Lengkap <span className="text-primary">*</span>
              </Label>
              <Input
                id="name"
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
                placeholder="Nama klien"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="gender">Jenis Kelamin</Label>
                <select
                  id="gender"
                  value={client.gender}
                  onChange={(e) => setClient({ ...client, gender: e.target.value })}
                  className="h-10 rounded-md border border-input bg-background/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Pilih...</option>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Usia</Label>
                <Input
                  id="age"
                  type="number"
                  min={0}
                  value={client.age}
                  onChange={(e) => setClient({ ...client, age: e.target.value })}
                  placeholder="Contoh: 34"
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="phone">No. Telepon</Label>
                <Input
                  id="phone"
                  value={client.phone}
                  onChange={(e) => setClient({ ...client, phone: e.target.value })}
                  placeholder="Opsional"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={client.email}
                  onChange={(e) => setClient({ ...client, email: e.target.value })}
                  placeholder="Opsional"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        currentQuestion && (
          <QuestionCard question={currentQuestion} answers={answers} onChange={setGroupAnswer} />
        )
      )}

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={goBack} disabled={step === 0 || isPending}>
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
        <Button onClick={goNext} disabled={isPending || (step >= 1 && !currentAnswered)} className="shadow-glow">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Menganalisis...
            </>
          ) : isLast ? (
            <>
              <Sparkles className="h-4 w-4" />
              Lihat Hasil Aura
            </>
          ) : (
            <>
              Lanjut
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
