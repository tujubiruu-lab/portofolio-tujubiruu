"use client"

import { AURAS, type AuraKey } from "@/lib/aura"
import { buildInterpretation } from "@/lib/interpret"
import type { Assessment, Client } from "@/lib/db/schema"
import { Starfield } from "@/components/starfield"
import { SiteHeader } from "@/components/site-header"
import { AuraScoreBars } from "@/components/aura-score-bars"
import { ReportDocument } from "@/components/report-document"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Printer, LayoutDashboard, RotateCcw, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function ResultView({ data }: { data: Assessment & { client: Client } }) {
  const scores = data.scores as Record<AuraKey, number>
  const dominant = data.dominant as AuraKey
  const secondary = (data.secondary as AuraKey) || null
  const tertiary = (data.tertiary as AuraKey) || null
  const flags = (data.flags as string[]) || []
  const dom = AURAS[dominant]
  const interpretation = buildInterpretation(dominant, secondary, tertiary)

  return (
    <>
      {/* On-screen premium view */}
      <main className="no-print relative min-h-dvh">
        <Starfield />
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="animate-fade-up">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Hasil Asesmen untuk
            </p>
            <h1 className="mt-1 text-center font-serif text-4xl font-semibold text-glow">{data.client.name}</h1>

            {/* Dominant aura hero */}
            <div className="mt-8 flex flex-col items-center">
              <div
                className="flex h-40 w-40 items-center justify-center rounded-full"
                style={{
                  background: `radial-gradient(circle, ${dom.hex}dd, ${dom.hex}33 60%, transparent 75%)`,
                  boxShadow: `0 0 60px ${dom.hex}88`,
                }}
              >
                <div
                  className="h-24 w-24 animate-float-slow rounded-full"
                  style={{ backgroundColor: dom.hex, boxShadow: `0 0 40px ${dom.hex}` }}
                />
              </div>
              <Badge className="mt-6 bg-primary/15 text-primary" variant="secondary">
                Aura Dominan
              </Badge>
              <h2 className="mt-2 font-serif text-3xl font-semibold">{dom.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{data.intensity}</p>
            </div>

            {/* Supporting auras */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {secondary && <AuraChip label="Pendukung" aura={secondary} />}
              {tertiary && <AuraChip label="Tambahan" aura={tertiary} />}
            </div>

            {flags.length > 0 && (
              <Card className="mt-6 border-primary/40 bg-primary/5 backdrop-blur-md">
                <CardContent className="flex gap-3 pt-6">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Indikator Perhatian</p>
                    <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground">
                      {flags.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interpretation */}
            <Card className="mt-6 border-border bg-card backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Interpretasi Energi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-pretty leading-relaxed text-muted-foreground">{interpretation}</p>
                <div className="rounded-lg border border-border bg-background/40 p-4">
                  <p className="mb-1 text-sm font-medium">Karakter {dom.name.replace("Aura ", "")}</p>
                  <p className="text-sm text-muted-foreground">{dom.characters.join(" • ")}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{dom.meaning}</p>
              </CardContent>
            </Card>

            {/* Scores */}
            <Card className="mt-6 border-border bg-card backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Rincian Skor Energi</CardTitle>
              </CardHeader>
              <CardContent>
                <AuraScoreBars scores={scores} />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" className="shadow-glow" onClick={() => window.print()}>
                <Printer className="h-4 w-4" />
                Cetak / Unduh PDF
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-card/40">
                <Link href={`/dashboard/${data.clientId}`}>
                  <LayoutDashboard className="h-4 w-4" />
                  Lihat di Dashboard
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/assessment">
                  <RotateCcw className="h-4 w-4" />
                  Asesmen Baru
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Print-only report */}
      <div className="report-print-area">
        <ReportDocument data={data} />
      </div>
    </>
  )
}

function AuraChip({ label, aura }: { label: string; aura: AuraKey }) {
  const a = AURAS[aura]
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 backdrop-blur-md">
      <span className="h-5 w-5 rounded-full" style={{ backgroundColor: a.hex, boxShadow: `0 0 12px ${a.hex}` }} />
      <div>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
        <p className="text-sm font-medium leading-none">{a.name.replace("Aura ", "")}</p>
      </div>
    </div>
  )
}
