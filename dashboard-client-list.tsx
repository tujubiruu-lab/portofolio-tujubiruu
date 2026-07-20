"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { Client } from "@/lib/db/schema"
import { AURAS, AURA_ORDER, type AuraKey } from "@/lib/aura"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Users, ArrowRight, Plus, Sparkles } from "lucide-react"

type ClientRow = Client & { latestDominant: string | null; assessmentCount: number }

export function DashboardClientList({ clients }: { clients: ClientRow[] }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<AuraKey | "all">("all")

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const matchQuery = c.name.toLowerCase().includes(query.toLowerCase())
      const matchFilter = filter === "all" || c.latestDominant === filter
      return matchQuery && matchFilter
    })
  }, [clients, query, filter])

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-glow">Dashboard Praktisi</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kelola klien, pantau perkembangan energi, dan cetak laporan asesmen.
          </p>
        </div>
        <Button asChild className="shadow-glow">
          <Link href="/assessment">
            <Plus className="h-4 w-4" />
            Asesmen Baru
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon={Users} label="Total Klien" value={clients.length} />
        <StatCard
          icon={Sparkles}
          label="Total Asesmen"
          value={clients.reduce((sum, c) => sum + c.assessmentCount, 0)}
        />
        <StatCard
          icon={Sparkles}
          label="Aura Dominan Terbanyak"
          value={mostCommonAura(clients)}
          isText
        />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama klien..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
            Semua
          </FilterPill>
          {AURA_ORDER.map((key) => (
            <FilterPill key={key} active={filter === key} onClick={() => setFilter(key)}>
              <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: AURAS[key].hex }} />
              {AURAS[key].name.replace("Aura ", "")}
            </FilterPill>
          ))}
        </div>
      </div>

      {/* Client grid */}
      {filtered.length === 0 ? (
        <Card className="mt-6 border-border bg-card backdrop-blur-md">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-medium">Belum ada klien</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Mulai asesmen pertama untuk menambahkan klien ke dashboard.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const aura = c.latestDominant ? AURAS[c.latestDominant as AuraKey] : null
            return (
              <Link key={c.id} href={`/dashboard/${c.id}`}>
                <Card className="group h-full border-border bg-card backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-glow">
                  <CardContent className="flex items-center gap-4 pt-6">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-serif font-semibold"
                      style={{
                        backgroundColor: aura ? `${aura.hex}22` : "var(--muted)",
                        color: aura?.hex ?? "var(--muted-foreground)",
                        boxShadow: aura ? `0 0 16px ${aura.hex}44` : "none",
                      }}
                    >
                      {c.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{c.name}</p>
                      <div className="mt-1 flex items-center gap-2">
                        {aura ? (
                          <Badge variant="secondary" className="bg-secondary/60 text-xs">
                            {aura.name.replace("Aura ", "")}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">Belum ada hasil</span>
                        )}
                        <span className="text-xs text-muted-foreground">{c.assessmentCount}x asesmen</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  isText,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  isText?: boolean
}) {
  return (
    <Card className="border-border bg-card backdrop-blur-md">
      <CardContent className="flex items-center gap-4 pt-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/30 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={isText ? "font-serif text-lg font-semibold" : "font-serif text-2xl font-semibold"}>{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

function mostCommonAura(clients: ClientRow[]): string {
  const counts: Record<string, number> = {}
  for (const c of clients) {
    if (c.latestDominant) counts[c.latestDominant] = (counts[c.latestDominant] ?? 0) + 1
  }
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
  if (!top) return "-"
  return AURAS[top[0] as AuraKey].name.replace("Aura ", "")
}
