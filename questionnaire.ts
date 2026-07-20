// Aura Reader - Questionnaire definition
// Each question has one or more "groups" of options. Groups can be single or multi select.

export type OptionGroup = {
  id: string
  label?: string
  type: "single" | "multi"
  max?: number // for multi select
  options: string[]
}

export type Question = {
  id: number
  title: string
  hint?: string
  groups: OptionGroup[]
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Apa alasan utama Anda datang hari ini, dan perubahan apa yang Anda harapkan terjadi dalam hidup Anda?",
    groups: [
      {
        id: "q1",
        label: "Pilih maksimal 3 jawaban",
        type: "multi",
        max: 3,
        options: [
          "Menemukan arah hidup yang lebih jelas.",
          "Memahami diri sendiri lebih dalam.",
          "Memperbaiki hubungan dengan pasangan.",
          "Memperbaiki hubungan dengan keluarga.",
          "Mengatasi stres dan tekanan hidup.",
          "Menemukan ketenangan batin.",
          "Meningkatkan kepercayaan diri.",
          "Menemukan tujuan spiritual.",
          "Mengatasi trauma atau luka masa lalu.",
          "Meningkatkan karier atau kondisi finansial.",
          "Memahami energi atau aura diri saya.",
          "Lainnya.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Jika Anda menggambarkan kondisi diri Anda saat ini dengan tiga kata, apa saja kata-kata tersebut?",
    groups: [
      {
        id: "q2",
        label: "Pilih 3 jawaban",
        type: "multi",
        max: 3,
        options: [
          "Tenang",
          "Bahagia",
          "Bersyukur",
          "Optimis",
          "Bersemangat",
          "Damai",
          "Bingung",
          "Lelah",
          "Cemas",
          "Sedih",
          "Kesepian",
          "Marah",
          "Tertekan",
          "Tidak berdaya",
          "Penuh harapan",
          "Sensitif",
          "Ambisius",
          "Tertutup",
          "Kreatif",
          "Mudah tersinggung",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Emosi apa yang paling sering Anda rasakan dalam satu bulan terakhir?",
    groups: [
      {
        id: "q3_emosi",
        label: "Emosi (pilih maksimal 3)",
        type: "multi",
        max: 3,
        options: [
          "Bahagia",
          "Damai",
          "Bersyukur",
          "Antusias",
          "Cemas",
          "Takut",
          "Sedih",
          "Marah",
          "Kecewa",
          "Hampa",
          "Kesepian",
          "Frustrasi",
          "Bingung",
          "Merasa tidak dihargai",
          "Merasa terbebani",
        ],
      },
      {
        id: "q3_pemicu",
        label: "Situasi pemicu",
        type: "multi",
        max: 3,
        options: [
          "Pekerjaan atau bisnis",
          "Hubungan pasangan",
          "Keluarga",
          "Finansial",
          "Masa depan",
          "Kesehatan",
          "Lingkungan sosial",
          "Tidak tahu penyebabnya",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Apakah ada pengalaman atau peristiwa di masa lalu yang masih memengaruhi kehidupan Anda?",
    groups: [
      {
        id: "q4",
        type: "multi",
        options: [
          "Kehilangan orang yang dicintai.",
          "Pengkhianatan atau kekecewaan.",
          "Perceraian atau perpisahan.",
          "Konflik keluarga.",
          "Pengalaman masa kecil.",
          "Kegagalan besar.",
          "Trauma emosional.",
          "Trauma fisik.",
          "Tidak ada yang terasa signifikan.",
          "Saya belum yakin.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Ketika menghadapi masalah, Anda lebih sering mengikuti:",
    groups: [
      {
        id: "q5",
        type: "single",
        options: [
          "Logika dan analisis.",
          "Perasaan dan emosi.",
          "Intuisi atau firasat.",
          "Pendapat orang lain.",
          "Kombinasi semuanya.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Bagaimana kualitas tidur, energi, dan kondisi tubuh Anda akhir-akhir ini?",
    groups: [
      {
        id: "q6_tidur",
        label: "Tidur",
        type: "single",
        options: [
          "Sangat baik.",
          "Cukup baik.",
          "Sering terbangun.",
          "Sulit tidur.",
          "Tidur tetapi tidak merasa segar.",
        ],
      },
      {
        id: "q6_energi",
        label: "Tingkat energi",
        type: "single",
        options: ["Sangat tinggi.", "Stabil.", "Naik turun.", "Sering lelah.", "Sangat rendah."],
      },
      {
        id: "q6_tubuh",
        label: "Keluhan tubuh",
        type: "multi",
        options: [
          "Tidak ada.",
          "Sakit kepala.",
          "Tegang di leher atau bahu.",
          "Nyeri punggung.",
          "Mudah lelah.",
          "Jantung berdebar.",
          "Gangguan pencernaan.",
          "Lainnya.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Pikiran apa yang paling sering muncul ketika sendirian atau sebelum tidur?",
    groups: [
      {
        id: "q7",
        type: "multi",
        options: [
          "Masa depan saya.",
          "Kondisi keuangan.",
          "Hubungan dengan pasangan.",
          "Keluarga.",
          "Penyesalan masa lalu.",
          "Kesalahan yang pernah saya lakukan.",
          "Tujuan hidup.",
          "Karier atau pekerjaan.",
          "Ketakutan kehilangan seseorang.",
          "Saya sulit menghentikan pikiran.",
          "Saya biasanya merasa tenang.",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Bagaimana hubungan Anda dengan orang-orang terdekat?",
    groups: [
      {
        id: "q8_keluarga",
        label: "Keluarga",
        type: "single",
        options: [
          "Sangat baik.",
          "Cukup baik.",
          "Ada konflik kecil.",
          "Ada konflik besar.",
          "Hubungan terasa jauh.",
        ],
      },
      {
        id: "q8_pasangan",
        label: "Pasangan",
        type: "single",
        options: [
          "Sangat harmonis.",
          "Cukup baik.",
          "Sering terjadi konflik.",
          "Sedang mengalami masalah serius.",
          "Tidak memiliki pasangan.",
        ],
      },
      {
        id: "q8_unfinished",
        label: "Apakah ada hubungan yang belum selesai?",
        type: "single",
        options: ["Ya.", "Tidak.", "Saya tidak yakin."],
      },
    ],
  },
  {
    id: 9,
    title: "Apakah ada seseorang atau situasi yang membuat Anda berenergi atau terkuras?",
    groups: [
      {
        id: "q9_energi",
        label: "Membuat berenergi",
        type: "multi",
        options: [
          "Pasangan.",
          "Anak-anak.",
          "Keluarga.",
          "Teman.",
          "Pekerjaan.",
          "Aktivitas spiritual.",
          "Alam.",
          "Hobi.",
        ],
      },
      {
        id: "q9_terkuras",
        label: "Membuat terkuras",
        type: "multi",
        options: [
          "Konflik keluarga.",
          "Hubungan pasangan.",
          "Lingkungan kerja.",
          "Finansial.",
          "Lingkungan sosial.",
          "Tanggung jawab yang terlalu banyak.",
          "Pikiran saya sendiri.",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Lingkungan seperti apa yang membuat Anda merasa paling nyaman?",
    groups: [
      {
        id: "q10",
        type: "multi",
        options: [
          "Alam terbuka.",
          "Tempat yang tenang dan sepi.",
          "Rumah bersama keluarga.",
          "Tempat ibadah.",
          "Dekat laut atau pantai.",
          "Pegunungan.",
          "Tempat ramai dan penuh aktivitas.",
          "Bersama orang-orang terdekat.",
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Apa yang paling Anda syukuri dan paling Anda takutkan kehilangan?",
    groups: [
      {
        id: "q11_syukur",
        label: "Yang paling disyukuri",
        type: "multi",
        options: [
          "Kesehatan.",
          "Keluarga.",
          "Pasangan.",
          "Anak-anak.",
          "Pekerjaan.",
          "Rezeki.",
          "Kesempatan hidup.",
          "Pertumbuhan diri.",
        ],
      },
      {
        id: "q11_takut",
        label: "Yang paling ditakutkan hilang",
        type: "multi",
        options: [
          "Orang yang dicintai.",
          "Kesehatan.",
          "Stabilitas finansial.",
          "Hubungan.",
          "Tujuan hidup.",
          "Identitas diri.",
          "Kepercayaan orang lain.",
        ],
      },
    ],
  },
  {
    id: 12,
    title: "Apakah Anda memiliki praktik spiritual atau kebiasaan tertentu yang membantu Anda merasa damai?",
    groups: [
      {
        id: "q12",
        type: "multi",
        options: [
          "Doa.",
          "Meditasi.",
          "Dzikir atau ibadah rutin.",
          "Menulis jurnal.",
          "Berada di alam.",
          "Olahraga.",
          "Mendengarkan musik.",
          "Tidak memiliki kebiasaan khusus.",
        ],
      },
    ],
  },
  {
    id: 13,
    title: "Menurut Anda, apa kekuatan terbesar dan tantangan terbesar dalam diri Anda?",
    groups: [
      {
        id: "q13_kekuatan",
        label: "Kekuatan",
        type: "multi",
        options: [
          "Empati.",
          "Kesabaran.",
          "Keteguhan hati.",
          "Kepemimpinan.",
          "Kreativitas.",
          "Kemampuan beradaptasi.",
          "Intuisi yang kuat.",
          "Kemampuan menyelesaikan masalah.",
        ],
      },
      {
        id: "q13_tantangan",
        label: "Tantangan",
        type: "multi",
        options: [
          "Overthinking.",
          "Kurang percaya diri.",
          "Sulit melepaskan masa lalu.",
          "Sulit mengatakan tidak.",
          "Mudah cemas.",
          "Emosi tidak stabil.",
          "Perfeksionis.",
          "Sulit percaya kepada orang lain.",
        ],
      },
    ],
  },
  {
    id: 14,
    title: "Jika hidup Anda adalah sebuah perjalanan, berada di tahap mana Anda sekarang?",
    groups: [
      {
        id: "q14_tahap",
        label: "Tahap perjalanan",
        type: "single",
        options: [
          "Masa pencarian jati diri.",
          "Masa penyembuhan.",
          "Masa membangun fondasi.",
          "Masa pertumbuhan.",
          "Masa perubahan besar.",
          "Masa panen hasil usaha.",
          "Masa transisi menuju babak baru.",
        ],
      },
      {
        id: "q14_tujuan",
        label: "Tujuan berikutnya",
        type: "multi",
        options: [
          "Kedamaian batin.",
          "Kesuksesan finansial.",
          "Hubungan yang sehat.",
          "Pertumbuhan spiritual.",
          "Keseimbangan hidup.",
          "Menemukan tujuan hidup.",
        ],
      },
    ],
  },
  {
    id: 15,
    title: "Jika satu beban dapat dilepaskan dan satu kualitas dapat diperkuat, apa yang Anda pilih?",
    groups: [
      {
        id: "q15_beban",
        label: "Beban yang ingin dilepaskan",
        type: "single",
        options: [
          "Ketakutan.",
          "Trauma masa lalu.",
          "Kemarahan.",
          "Rasa bersalah.",
          "Kecemasan.",
          "Kesepian.",
          "Kekecewaan.",
          "Keraguan terhadap diri sendiri.",
        ],
      },
      {
        id: "q15_kualitas",
        label: "Kualitas yang ingin diperkuat",
        type: "single",
        options: [
          "Kepercayaan diri.",
          "Ketenangan.",
          "Keberanian.",
          "Kesabaran.",
          "Intuisi.",
          "Kasih sayang.",
          "Fokus.",
          "Kebijaksanaan.",
        ],
      },
    ],
  },
]

export type Answers = Record<string, string[]>
