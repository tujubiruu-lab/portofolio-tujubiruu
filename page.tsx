import { getAssessment } from "@/app/actions/assessments"
import { ResultView } from "@/components/result-view"
import { notFound } from "next/navigation"

export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const assessmentId = Number(id)
  if (Number.isNaN(assessmentId)) notFound()

  const assessment = await getAssessment(assessmentId)
  if (!assessment) notFound()

  return <ResultView data={assessment} />
}
