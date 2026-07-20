"use client"

import type { Answers, Question } from "@/lib/questionnaire"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type Props = {
  question: Question
  answers: Answers
  onChange: (groupId: string, values: string[]) => void
}

export function QuestionCard({ question, answers, onChange }: Props) {
  const toggle = (groupId: string, type: "single" | "multi", max: number | undefined, option: string) => {
    const current = answers[groupId] ?? []
    if (type === "single") {
      onChange(groupId, current.includes(option) ? [] : [option])
      return
    }
    // multi
    if (current.includes(option)) {
      onChange(
        groupId,
        current.filter((o) => o !== option),
      )
    } else {
      if (max && current.length >= max) {
        toast.warning(`Maksimal ${max} pilihan untuk bagian ini.`)
        return
      }
      onChange(groupId, [...current, option])
    }
  }

  return (
    <Card className="border-border bg-card backdrop-blur-md">
      <CardHeader>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/30 font-serif text-sm font-semibold text-primary">
            {question.id}
          </span>
          <CardTitle className="text-pretty font-serif text-xl leading-snug">{question.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {question.groups.map((group) => {
          const selected = answers[group.id] ?? []
          return (
            <fieldset key={group.id}>
              {group.label && (
                <legend className="mb-3 text-sm font-medium text-primary">
                  {group.label}
                  {group.type === "single" && <span className="ml-1 text-muted-foreground">(pilih satu)</span>}
                </legend>
              )}
              <div className="grid gap-2 sm:grid-cols-2">
                {group.options.map((option) => {
                  const isSelected = selected.includes(option)
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggle(group.id, group.type, group.max, option)}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all",
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground shadow-glow"
                          : "border-border bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center border transition-colors",
                          group.type === "single" ? "rounded-full" : "rounded-md",
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40",
                        )}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span className="text-pretty">{option}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )
        })}
      </CardContent>
    </Card>
  )
}
