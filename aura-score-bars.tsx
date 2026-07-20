import { AURAS, AURA_ORDER, type AuraKey } from "@/lib/aura"

export function AuraScoreBars({ scores }: { scores: Record<AuraKey, number> }) {
  const max = Math.max(...AURA_ORDER.map((k) => scores[k]), 1)
  return (
    <div className="space-y-2.5">
      {AURA_ORDER.map((key) => {
        const a = AURAS[key]
        const val = scores[key] ?? 0
        const pct = (val / max) * 100
        return (
          <div key={key} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-right text-xs text-muted-foreground">{a.name.replace("Aura ", "")}</span>
            <div className="relative h-4 flex-1 overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: a.hex, boxShadow: `0 0 10px ${a.hex}88` }}
              />
            </div>
            <span className="w-6 shrink-0 text-sm font-semibold tabular-nums">{val}</span>
          </div>
        )
      })}
    </div>
  )
}
