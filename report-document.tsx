import { AURAS, AURA_ORDER, type AuraKey } from "@/lib/aura"
import { buildInterpretation } from "@/lib/interpret"
import { QUESTIONS, type Answers } from "@/lib/questionnaire"
import type { Assessment, Client } from "@/lib/db/schema"

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// This component is styled with plain light colors so it prints cleanly (like a medical report).
export function ReportDocument({ data }: { data: Assessment & { client: Client } }) {
  const answers = data.answers as Answers
  const scores = data.scores as Record<AuraKey, number>
  const dominant = data.dominant as AuraKey
  const secondary = (data.secondary as AuraKey) || null
  const tertiary = (data.tertiary as AuraKey) || null
  const flags = (data.flags as string[]) || []
  const interpretation = buildInterpretation(dominant, secondary, tertiary)
  const maxScore = Math.max(...AURA_ORDER.map((k) => scores[k] ?? 0), 1)

  return (
    <div className="report-doc mx-auto w-full max-w-[210mm] bg-white p-[14mm] text-[#1a1a2e]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#b8912f] pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#2a1a4a]">LAPORAN ASESMEN AURA</h1>
          <p className="text-sm text-[#6b5b8a]">Yayasan Nur Qolbu Bunda Yayula</p>
        </div>
        <div className="text-right text-xs text-[#6b5b8a]">
          <p>No. Asesmen: AR-{String(data.id).padStart(5, "0")}</p>
          <p>{formatDate(data.createdAt)}</p>
        </div>
      </div>

      {/* Client identity */}
      <section className="mt-5">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#b8912f]">Data Klien</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
          <InfoRow label="Nama" value={data.client.name} />
          <InfoRow label="Jenis Kelamin" value={data.client.gender || "-"} />
          <InfoRow label="Usia" value={data.client.age ? `${data.client.age} tahun` : "-"} />
          <InfoRow label="No. Telepon" value={data.client.phone || "-"} />
          <InfoRow label="Email" value={data.client.email || "-"} />
        </div>
      </section>

      {/* Result summary */}
      <section className="mt-5 rounded-lg border border-[#e0d6f0] bg-[#faf8ff] p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#b8912f]">Hasil Profil Aura</h2>
        <div className="flex flex-wrap gap-3">
          <ResultBadge label="Aura Dominan" aura={dominant} />
          {secondary && <ResultBadge label="Aura Pendukung" aura={secondary} />}
          {tertiary && <ResultBadge label="Energi Tambahan" aura={tertiary} />}
        </div>
        <p className="mt-3 text-sm">
          <span className="font-semibold">Tingkat Intensitas:</span> {data.intensity} (skor {scores[dominant]})
        </p>
        <p className="mt-2 text-sm leading-relaxed">{interpretation}</p>
        {flags.length > 0 && (
          <div className="mt-3 rounded-md border border-[#e6c04a] bg-[#fff8e1] p-3">
            <p className="text-xs font-bold uppercase text-[#8a6d00]">Indikator Perhatian</p>
            <ul className="mt-1 list-disc pl-5 text-sm text-[#5a4a00]">
              {flags.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Score table */}
      <section className="mt-5">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#b8912f]">Rincian Skor Energi</h2>
        <div className="space-y-1.5">
          {AURA_ORDER.map((key) => {
            const a = AURAS[key]
            const val = scores[key] ?? 0
            return (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span className="w-24 shrink-0">{a.name.replace("Aura ", "")}</span>
                <div className="relative h-3.5 flex-1 overflow-hidden rounded bg-[#efeaf7]">
                  <div className="h-full rounded" style={{ width: `${(val / maxScore) * 100}%`, backgroundColor: a.hex }} />
                </div>
                <span className="w-6 text-right font-semibold tabular-nums">{val}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Full answers */}
      <section className="mt-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#b8912f]">Rekapitulasi Jawaban Klien</h2>
        <div className="space-y-3">
          {QUESTIONS.map((q) => {
            const hasAny = q.groups.some((g) => (answers[g.id]?.length ?? 0) > 0)
            return (
              <div key={q.id} className="break-inside-avoid rounded-md border border-[#eee] p-3">
                <p className="text-sm font-semibold text-[#2a1a4a]">
                  {q.id}. {q.title}
                </p>
                {!hasAny && <p className="mt-1 text-sm italic text-[#999]">Tidak dijawab</p>}
                {q.groups.map((g) => {
                  const vals = answers[g.id] ?? []
                  if (vals.length === 0) return null
                  return (
                    <div key={g.id} className="mt-1.5">
                      {g.label && <p className="text-xs font-medium text-[#8a7bb0]">{g.label}</p>}
                      <p className="text-sm text-[#333]">{vals.join(" • ")}</p>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </section>

      {/* Practitioner notes */}
      {data.practitionerNotes && (
        <section className="mt-5 break-inside-avoid">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#b8912f]">Catatan Praktisi</h2>
          <p className="whitespace-pre-wrap rounded-md border border-[#eee] bg-[#faf8ff] p-3 text-sm">
            {data.practitionerNotes}
          </p>
        </section>
      )}

      {/* Signature */}
      <div className="mt-10 flex justify-between text-sm">
        <div />
        <div className="text-center">
          <p className="text-[#6b5b8a]">Praktisi Pembacaan Aura</p>
          <div className="mt-14 border-t border-[#333] px-8" />
          <p className="mt-1 text-xs text-[#6b5b8a]">Yayasan Nur Qolbu Bunda Yayula</p>
        </div>
      </div>

      <p className="mt-6 border-t border-[#eee] pt-3 text-center text-[10px] text-[#999]">
        Dokumen ini merupakan alat bantu asesmen energi dan bukan diagnosis medis. Digunakan sebagai acuan dalam sesi
        konsultasi bersama praktisi.
      </p>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-28 shrink-0 text-[#6b5b8a]">{label}</span>
      <span className="font-medium">: {value}</span>
    </div>
  )
}

function ResultBadge({ label, aura }: { label: string; aura: AuraKey }) {
  const a = AURAS[aura]
  return (
    <div className="flex items-center gap-2 rounded-md border border-[#e0d6f0] bg-white px-3 py-2">
      <span className="h-6 w-6 rounded-full border border-[#ccc]" style={{ backgroundColor: a.hex }} />
      <div>
        <p className="text-[10px] uppercase tracking-wide text-[#8a7bb0]">{label}</p>
        <p className="text-sm font-bold text-[#2a1a4a]">{a.name.replace("Aura ", "")}</p>
      </div>
    </div>
  )
}
