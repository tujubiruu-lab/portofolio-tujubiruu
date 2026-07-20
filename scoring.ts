import type { AuraKey } from "./aura"
import { AURA_ORDER, intensityLabel } from "./aura"
import type { Answers } from "./questionnaire"

type Rule = {
  // lowercase substring to test against a selected answer
  match: string
  scores: Partial<Record<AuraKey, number>>
}

// Rules derived from the Aura Reader scoring specification.
// +2 = sangat sesuai, +1 = cukup sesuai
const RULES: Rule[] = [
  // ---- MERAH ----
  { match: "ambisius", scores: { merah: 2 } },
  { match: "bersemangat", scores: { merah: 2, oranye: 1 } },
  { match: "meningkatkan karier atau kondisi finansial", scores: { merah: 2, kuning: 1 } },
  { match: "sangat tinggi", scores: { merah: 2 } },
  { match: "kepemimpinan", scores: { merah: 2 } },
  { match: "keberanian", scores: { merah: 2 } },
  { match: "keteguhan hati", scores: { merah: 1 } },
  { match: "masa membangun fondasi", scores: { merah: 2 } },
  { match: "masa panen hasil usaha", scores: { merah: 2 } },
  { match: "kesuksesan finansial", scores: { merah: 1, kuning: 1 } },

  // ---- ORANYE ----
  { match: "kreatif", scores: { oranye: 2 } },
  { match: "kreativitas", scores: { oranye: 2 } },
  { match: "optimis", scores: { oranye: 2 } },
  { match: "meningkatkan kepercayaan diri", scores: { oranye: 2 } },
  { match: "kepercayaan diri", scores: { oranye: 1 } },
  { match: "lingkungan sosial", scores: { oranye: 1 } },
  { match: "teman", scores: { oranye: 1 } },
  { match: "tempat ramai dan penuh aktivitas", scores: { oranye: 2 } },
  { match: "masa pertumbuhan", scores: { oranye: 2 } },
  { match: "masa perubahan besar", scores: { oranye: 1 } },
  { match: "pertumbuhan diri", scores: { oranye: 2 } },
  { match: "hobi", scores: { oranye: 1 } },
  { match: "antusias", scores: { oranye: 2 } },

  // ---- KUNING ----
  { match: "logika dan analisis", scores: { kuning: 2 } },
  { match: "karier atau pekerjaan", scores: { kuning: 2 } },
  { match: "pekerjaan atau bisnis", scores: { kuning: 1 } },
  { match: "kemampuan menyelesaikan masalah", scores: { kuning: 2 } },
  { match: "perfeksionis", scores: { kuning: 2 } },
  { match: "tujuan hidup", scores: { kuning: 1, biru: 1 } },
  { match: "stabilitas finansial", scores: { kuning: 2 } },
  { match: "kondisi keuangan", scores: { kuning: 1 } },
  { match: "menemukan arah hidup", scores: { kuning: 1 } },
  { match: "fokus", scores: { kuning: 1 } },

  // ---- HIJAU ----
  { match: "empati", scores: { hijau: 2 } },
  { match: "kesabaran", scores: { hijau: 2 } },
  { match: "memperbaiki hubungan dengan keluarga", scores: { hijau: 1 } },
  { match: "keluarga", scores: { hijau: 1 } },
  { match: "hubungan yang sehat", scores: { hijau: 2 } },
  { match: "sangat harmonis", scores: { hijau: 2, putih: 1 } },
  { match: "alam", scores: { hijau: 1, ungu: 1 } },
  { match: "alam terbuka", scores: { hijau: 1, ungu: 1 } },
  { match: "kasih sayang", scores: { hijau: 2 } },
  { match: "aktivitas spiritual", scores: { hijau: 1, ungu: 1 } },
  { match: "anak-anak", scores: { hijau: 1 } },
  { match: "kemampuan beradaptasi", scores: { hijau: 1 } },

  // ---- BIRU ----
  { match: "menemukan ketenangan batin", scores: { biru: 2 } },
  { match: "ketenangan", scores: { biru: 1 } },
  { match: "menulis jurnal", scores: { biru: 2 } },
  { match: "doa", scores: { biru: 1, ungu: 1 } },
  { match: "dzikir atau ibadah rutin", scores: { biru: 2, ungu: 1 } },
  { match: "tempat yang tenang dan sepi", scores: { biru: 2 } },
  { match: "kebijaksanaan", scores: { biru: 2 } },
  { match: "kedamaian batin", scores: { biru: 1, putih: 1 } },
  { match: "reflektif", scores: { biru: 1 } },

  // ---- UNGU ----
  { match: "menemukan tujuan spiritual", scores: { ungu: 2 } },
  { match: "tujuan spiritual", scores: { ungu: 2 } },
  { match: "intuisi atau firasat", scores: { ungu: 2 } },
  { match: "intuisi yang kuat", scores: { ungu: 2 } },
  { match: "intuisi", scores: { ungu: 1 } },
  { match: "meditasi", scores: { ungu: 2 } },
  { match: "tempat ibadah", scores: { ungu: 2 } },
  { match: "pertumbuhan spiritual", scores: { ungu: 2 } },
  { match: "memahami energi atau aura", scores: { ungu: 1 } },
  { match: "sensitif", scores: { ungu: 1 } },

  // ---- PUTIH ----
  { match: "damai", scores: { putih: 2 } },
  { match: "bersyukur", scores: { putih: 2, hijau: 1 } },
  { match: "bahagia", scores: { putih: 2 } },
  { match: "tenang", scores: { putih: 1, biru: 1 } },
  { match: "sangat baik", scores: { putih: 2 } }, // tidur sangat baik / hubungan sangat baik
  { match: "stabil", scores: { putih: 2 } },
  { match: "keseimbangan hidup", scores: { putih: 2 } },
  { match: "penuh harapan", scores: { putih: 1, oranye: 1 } },
  { match: "kesempatan hidup", scores: { putih: 1 } },

  // ---- ABU-ABU ----
  { match: "bingung", scores: { abu: 2 } },
  { match: "lelah", scores: { abu: 2 } },
  { match: "hampa", scores: { abu: 2 } },
  { match: "tidak berdaya", scores: { abu: 2 } },
  { match: "sulit tidur", scores: { abu: 2 } },
  { match: "overthinking", scores: { abu: 2 } },
  { match: "masa transisi", scores: { abu: 2 } },
  { match: "tidak tahu penyebabnya", scores: { abu: 2 } },
  { match: "sering lelah", scores: { abu: 1 } },
  { match: "sangat rendah", scores: { abu: 2 } },
  { match: "naik turun", scores: { abu: 1 } },
  { match: "frustrasi", scores: { abu: 1 } },
  { match: "mengatasi stres dan tekanan", scores: { abu: 1 } },
  { match: "merasa terbebani", scores: { abu: 1 } },
  { match: "sulit menghentikan pikiran", scores: { abu: 1 } },

  // ---- HITAM ----
  { match: "trauma masa lalu", scores: { hitam: 2 } },
  { match: "trauma emosional", scores: { hitam: 2 } },
  { match: "trauma fisik", scores: { hitam: 1 } },
  { match: "pengkhianatan", scores: { hitam: 2 } },
  { match: "kehilangan orang yang dicintai", scores: { hitam: 2 } },
  { match: "kemarahan", scores: { hitam: 2 } },
  { match: "marah", scores: { hitam: 1 } },
  { match: "rasa bersalah", scores: { hitam: 2 } },
  { match: "kesepian", scores: { hitam: 2, abu: 1 } },
  { match: "kekecewaan", scores: { hitam: 2 } },
  { match: "kecewa", scores: { hitam: 1 } },
  { match: "sulit percaya kepada orang lain", scores: { hitam: 2 } },
  { match: "sulit melepaskan masa lalu", scores: { hitam: 2 } },
  { match: "penyesalan masa lalu", scores: { hitam: 1 } },
  { match: "mengatasi trauma atau luka masa lalu", scores: { hitam: 1 } },
  { match: "perceraian atau perpisahan", scores: { hitam: 1 } },
  { match: "konflik keluarga", scores: { hitam: 1 } },
  { match: "masa penyembuhan", scores: { hitam: 1, hijau: 1 } },
]

export type ScoreResult = {
  scores: Record<AuraKey, number>
  ranked: { key: AuraKey; score: number }[]
  dominant: AuraKey
  secondary: AuraKey | null
  tertiary: AuraKey | null
  intensity: string
  flags: string[]
}

export function computeScores(answers: Answers): ScoreResult {
  const scores: Record<AuraKey, number> = {
    merah: 0,
    oranye: 0,
    kuning: 0,
    hijau: 0,
    biru: 0,
    ungu: 0,
    putih: 0,
    abu: 0,
    hitam: 0,
  }

  const allSelected: string[] = []
  for (const key of Object.keys(answers)) {
    for (const val of answers[key]) allSelected.push(val)
  }

  for (const selected of allSelected) {
    const lower = selected.toLowerCase()
    for (const rule of RULES) {
      if (lower.includes(rule.match)) {
        for (const [aura, pts] of Object.entries(rule.scores)) {
          scores[aura as AuraKey] += pts as number
        }
      }
    }
  }

  const ranked = AURA_ORDER.map((key) => ({ key, score: scores[key] })).sort((a, b) => b.score - a.score)

  const dominant = ranked[0].key
  const secondary = ranked[1] && ranked[1].score > 0 ? ranked[1].key : null
  const tertiary = ranked[2] && ranked[2].score > 0 ? ranked[2].key : null

  const intensity = intensityLabel(ranked[0].score)

  // Flags: if abu or hitam in top 2
  const flags: string[] = []
  const topTwo = [ranked[0].key, ranked[1]?.key]
  if (topTwo.includes("abu") || topTwo.includes("hitam")) {
    flags.push("Sedang berada dalam fase pemulihan.")
    flags.push("Sedang mengalami transisi besar dalam kehidupan.")
    flags.push("Membutuhkan waktu untuk mengisi ulang energi emosional.")
  }

  return { scores, ranked, dominant, secondary, tertiary, intensity, flags }
}
