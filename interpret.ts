import { AURAS, type AuraKey } from "./aura"

export function buildInterpretation(dominant: AuraKey, secondary: AuraKey | null, tertiary: AuraKey | null): string {
  const d = AURAS[dominant]
  let text = `Anda memiliki energi dominan ${d.name.replace("Aura ", "")} yang menunjukkan ${d.characters
    .slice(0, 2)
    .join(" dan ")
    .toLowerCase()}.`

  if (secondary) {
    const s = AURAS[secondary]
    text += ` Energi ${s.name.replace("Aura ", "")} menunjukkan ${s.characters[0].toLowerCase()} sebagai kekuatan pendukung.`
  }
  if (tertiary) {
    const t = AURAS[tertiary]
    text += ` Sementara ${t.name.replace(
      "Aura ",
      "",
    )} menunjukkan sisi ${t.characters[0].toLowerCase()} yang cukup menonjol.`
  }
  return text
}
