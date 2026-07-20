export type AuraKey = "merah" | "oranye" | "kuning" | "hijau" | "biru" | "ungu" | "putih" | "abu" | "hitam"

export type AuraInfo = {
  key: AuraKey
  name: string
  symbol: string
  hex: string
  characters: string[]
  meaning: string
}

export const AURAS: Record<AuraKey, AuraInfo> = {
  merah: {
    key: "merah",
    name: "Aura Merah",
    symbol: "🔴",
    hex: "#e0435a",
    characters: ["Ambisius", "Berani", "Kompetitif", "Berorientasi tindakan", "Energi tinggi"],
    meaning:
      "Energi Merah menunjukkan dorongan kuat untuk berkembang dan bertindak. Anda memiliki semangat, keberanian, dan orientasi pada pencapaian.",
  },
  oranye: {
    key: "oranye",
    name: "Aura Oranye",
    symbol: "🟠",
    hex: "#f0883e",
    characters: ["Kreatif", "Percaya diri", "Sosial", "Antusias", "Menyukai tantangan baru"],
    meaning:
      "Energi Oranye memancarkan kreativitas, antusiasme, dan kehangatan sosial. Anda menikmati pertumbuhan diri dan tantangan baru.",
  },
  kuning: {
    key: "kuning",
    name: "Aura Kuning",
    symbol: "🟡",
    hex: "#e8c547",
    characters: ["Logis", "Analitis", "Intelektual", "Terstruktur", "Berorientasi tujuan"],
    meaning:
      "Energi Kuning mencerminkan kejernihan berpikir, logika, dan orientasi pada tujuan. Anda cenderung analitis dan terstruktur.",
  },
  hijau: {
    key: "hijau",
    name: "Aura Hijau",
    symbol: "🟢",
    hex: "#4caf7d",
    characters: ["Empatik", "Penyayang", "Harmonis", "Penyembuh alami", "Menyukai kedamaian"],
    meaning:
      "Energi Hijau menunjukkan empati dan kebutuhan akan harmoni. Anda memiliki kemampuan menyembuhkan dan menjaga keseimbangan relasi.",
  },
  biru: {
    key: "biru",
    name: "Aura Biru",
    symbol: "🔵",
    hex: "#4a8fe0",
    characters: ["Komunikatif", "Reflektif", "Jujur", "Damai", "Introspektif"],
    meaning:
      "Energi Biru mencerminkan ketenangan, kejujuran, dan kedalaman refleksi. Anda cenderung introspektif dan mencari kedamaian batin.",
  },
  ungu: {
    key: "ungu",
    name: "Aura Ungu",
    symbol: "🟣",
    hex: "#9d6bd8",
    characters: ["Spiritual", "Intuitif", "Visioner", "Sensitif terhadap energi sekitar"],
    meaning:
      "Energi Ungu menunjukkan sisi intuitif dan spiritual yang menonjol. Anda peka terhadap energi di sekitar dan memiliki visi mendalam.",
  },
  putih: {
    key: "putih",
    name: "Aura Putih",
    symbol: "⚪",
    hex: "#e8e6f0",
    characters: ["Damai", "Seimbang", "Penerimaan diri tinggi", "Stabil secara emosional"],
    meaning:
      "Energi Putih mencerminkan keseimbangan, kedamaian, dan penerimaan diri. Anda berada dalam kondisi emosional yang stabil dan selaras.",
  },
  abu: {
    key: "abu",
    name: "Aura Abu-abu",
    symbol: "🌫️",
    hex: "#8a8f9c",
    characters: ["Kelelahan emosional", "Kebingungan", "Kehilangan arah", "Beban mental tinggi"],
    meaning:
      "Energi Abu-abu menandakan kelelahan emosional dan kebingungan arah. Ini adalah fase yang membutuhkan pemulihan dan pengisian ulang energi.",
  },
  hitam: {
    key: "hitam",
    name: "Aura Hitam",
    symbol: "⚫",
    hex: "#3a3a44",
    characters: ["Menyimpan luka emosional berat", "Merasa terjebak", "Sulit melepaskan masa lalu"],
    meaning:
      "Energi Hitam menunjukkan adanya luka emosional yang belum sembuh dan perasaan terjebak. Fase ini membutuhkan penyembuhan mendalam.",
  },
}

export const AURA_ORDER: AuraKey[] = [
  "merah",
  "oranye",
  "kuning",
  "hijau",
  "biru",
  "ungu",
  "putih",
  "abu",
  "hitam",
]

export function intensityLabel(score: number): string {
  if (score <= 5) return "Energi sangat lemah"
  if (score <= 10) return "Energi ringan"
  if (score <= 15) return "Energi cukup dominan"
  if (score <= 20) return "Energi dominan"
  return "Energi sangat kuat"
}
