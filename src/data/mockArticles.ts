import { EducationalArticle } from "@/types";

export const initialArticles: EducationalArticle[] = [
  {
    id: "art-kump-1",
    title: "Cegah Gula Darah Naik, Penderita Diabetes Perlu Terapkan Pola Makan 3J Kata Ahli",
    category: "Nutrisi & Diet",
    summary: "Ahli spesialis penyakit dalam dr. Martha Rosana, Sp.PD menjelaskan bahwa tidak ada makanan yang sepenuhnya dilarang bagi penderita diabetes, asalkan konsisten menerapkan konsep Terapi 3J: Jadwal, Jumlah, dan Jenis.",
    content: `
### Kunci Pengelolaan Diabetes dengan Pola Makan 3J
Banyak penderita diabetes merasa terbebani karena anggapan bahwa mereka tidak boleh lagi menikmati makanan lezat. Padahal menurut dokter spesialis penyakit dalam **dr. Martha Rosana, Sp.PD**, tidak ada pantangan mutlak jika pasien mampu mengendalikan tiga pilar utama pengaturan makan yang dikenal sebagai prinsip **3J**.

### 1. Jadwal (Keteraturan Waktu Makan)
- Tubuh penderita diabetes membutuhkan ritme metabolisme yang stabil untuk memproses asupan glukosa.
- Makanlah dengan interval teratur setiap **3 hingga 4 jam** (terdiri dari 3 kali makan utama dan 2-3 kali camilan sehat berkalori rendah).
- **Penting:** Hindari melewatkan waktu makan karena dapat memicu fluktuasi drastis dari hipoglikemia menuju hiperglikemia reaktif (*rebound effect*).

### 2. Jumlah (Kebutuhan Kalori Terukur)
- Jumlah kalori yang masuk harus disesuaikan dengan kebutuhan basal tubuh (BMR), berat badan ideal, usia, dan tingkat aktivitas fisik.
- Membatasi porsi karbohidrat sederhana dan menggantinya dengan porsi sayuran berserat tinggi untuk mempertahankan rasa kenyang lebih lama.

### 3. Jenis (Komposisi Gizi Seimbang)
- Prioritaskan karbohidrat kompleks dengan **Indeks Glikemik (GI) rendah** seperti nasi merah, oat, atau umbi-umbian kukus.
- Pastikan piring makan menerapkan konsep gizi seimbang: 50% sayuran hijau non-tepung, 25% protein rendah lemak (ikan, tempe, dada ayam), dan 25% karbohidrat kompleks.
- Hindari makanan olahan yang mengandung pemanis tambahan (sirup jagung tinggi fruktosa) dan lemak trans jenuh.
    `,
    readingTimeMinutes: 4,
    featuredImage: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1565868849/xto930pvkyykbivkaohl.jpg",
    author: "Kumparan Health (Narasumber: dr. Martha Rosana, Sp.PD)",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/kumparanfood/cegah-gula-darah-naik-penderita-diabetes-perlu-terapkan-pola-makan-3j-kata-ahli-1wu6KBNzhXr",
    createdAt: "2026-09-15T08:30:00Z",
    doctorReview: {
      id: "rev-kump-1",
      articleId: "art-kump-1",
      reviewerName: "dr. Martha Rosana, Sp.PD",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam - RSUPN Dr. Cipto Mangunkusumo",
      strNumber: "STR-3171-4458-2023",
      hospital: "RSUPN Dr. Cipto Mangunkusumo Jakarta",
      reviewNotes: "Materi ini terverifikasi klinis. Penjelasan konsep 3J sangat aplikatif dan membantu pasien terhindar dari malnutrisi akibat diet yang terlalu ketat tanpa panduan medis.",
      approvalStatus: "Approved",
      reviewedAt: "2026-09-16T10:15:00Z",
    },
  },
  {
    id: "art-kump-2",
    title: "Smart Drug Delivery System: Insulin Pintar yang Tahu Kapan Harus Bekerja Sendiri",
    category: "Panduan Obat & Insulin",
    summary: "Inovasi mutakhir teknologi formulasi nano-vesikel glukosa-responsif yang dirancang untuk meniru fungsi sel beta pankreas secara otomatis: melepaskan insulin hanya saat gula darah meningkat.",
    content: `
### Masa Depan Terapi Diabetes: Smart Insulin
Bagi penderita diabetes yang bergantung pada insulin, tantangan terbesar harian adalah risiko **hipoglikemia** (gula darah drop berbahaya) akibat dosis insulin yang melebihi kebutuhan metabolik saat itu.

Kini, perkembangan teknologi medis menghadirkan terobosan baru bernama **Smart Drug Delivery System (Sistem Penghantaran Obat Pintar)**.

### Bagaimana Insulin Pintar Bekerja?
1. **Material Glukosa-Responsif**:
   Insulin dikemas dalam mikrokapsul polimer berukuran nano yang memiliki reseptor sensitif terhadap kadar glukosa dalam darah.
2. **Aktivasi Otomatis Berdasarkan Ambang Batas**:
   - Ketika gula darah naik di atas **140 mg/dL**, ikatan molekul polimer akan melemah dan membuka pintu vesikel, melepaskan insulin ke aliran darah.
   - Begitu kadar gula darah turun kembali ke rentang normal (80 - 100 mg/dL), vesikel akan menutup kembali secara otomatis.
3. **Mencegah Hipoglikemia**:
   Pasien tidak perlu khawatir lagi mengalami syok hipoglikemia saat tidur di malam hari, karena pelepasan hormon insulin akan terhenti dengan sendirinya tanpa intervensi manual.

### Kapan Terapi Ini Dapat Digunakan Luas?
Saat ini inovasi ini sedang melalui fase uji klinis tahap lanjut dan diharapkan dapat menjadi alternatif revolusioner pengganti suntikan insulin konvensional berkali-kali sehari.
    `,
    readingTimeMinutes: 5,
    featuredImage: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01ks8ws2f7wesenpnt0k4bp4dm.png",
    author: "Erina Alya Damayanti / kumparan.com",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/erina-alya-damayanti/smart-drug-delivery-system-insulin-pintar-yang-tahu-kapan-harus-bekerja-sendiri-27QUiAglHDp",
    createdAt: "2026-05-28T09:00:00Z",
    doctorReview: {
      id: "rev-kump-2",
      articleId: "art-kump-2",
      reviewerName: "dr. Handoko Santoso, Sp.PD, KEMD",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam - Konsultan Endokrin, Metabolik & Diabetes",
      strNumber: "STR-3171-8892-2024",
      hospital: "RS Pusat Jantung dan Endokrin Nasional",
      reviewNotes: "Tinjauan literatur ilmiah akurat. Konsep glucose-responsive insulin (GRI) adalah masa depan terapi diabetes tipe 1 dan tipe 2 lanjut yang menjanjikan keselamatan pasien.",
      approvalStatus: "Approved",
      reviewedAt: "2026-05-29T14:30:00Z",
    },
  },
  {
    id: "art-kump-3",
    title: "Diabetes Melitus: Pembunuh Senyap yang Mengintai Kesehatan Kita",
    category: "Pencegahan Komplikasi",
    summary: "Diabetes kerap dijuluki 'The Silent Killer' karena merusak pembuluh darah mikro dan makro tanpa menimbulkan rasa sakit pada fase awal hingga komplikasi jantung, ginjal, dan saraf terjadi.",
    content: `
### Mengapa Diabetes Disebut 'The Silent Killer'?
Banyak orang tidak menyadari bahwa mereka telah mengidap diabetes selama bertahun-tahun. Pada tahap awal, kenaikan gula darah sering kali tidak menunjukkan gejala nyeri yang nyata, sehingga penderita baru memeriksakan diri saat komplikasi vaskular sudah terjadi.

### Gejala Klasik 'Trias Diabetes' yang Wajib Diwaspadai:
- **Poliuria**: Frekuensi buang air kecil meningkat drastis, terutama sering terbangun 3-4 kali di malam hari untuk berkemih.
- **Polidipsia**: Rasa haus ekstrem yang tidak kunjung reda meski sudah banyak minum air.
- **Polifagia**: Nafsu makan melonjak drastis, namun berat badan justru turun drastis tanpa program diet karena sel tubuh kelaparan akibat glukosa tidak dapat masuk.

### Ancaman Komplikasi Jangka Panjang:
1. **Mikrovaskular (Pembuluh Darah Kecil)**:
   - **Retinopati Diabetik**: Kerusakan retina mata yang dapat memicu kebutaan permanen.
   - **Nefropati Diabetik**: Kerusakan nefron ginjal yang berujung pada gagal ginjal kronis dan cuci darah.
   - **Neuropati Diabetik**: Kerusakan serabut saraf tepi yang memicu baal/kebas dan ulkus luka kaki diabetes.
2. **Makrovaskular (Pembuluh Darah Besar)**:
   - Serangan jantung koroner dan stroke iskemik dini.

### Kunci Pencegahan:
Skrining gula darah rutin setiap 6 bulan bagi usia di atas 30 tahun, dan pemeriksaan **HbA1c** (rata-rata gula darah 3 bulan) untuk deteksi dini sebelum kerusakan organ terjadi.
    `,
    readingTimeMinutes: 5,
    featuredImage: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01j008efc9gxs4x7tyaf20z9qc.jpg",
    author: "Rhesa Novita Dwi Hastuti / kumparan.com",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/rhesa-novitadw/diabetes-melitus-pembunuh-senyap-yang-mengintai-kesehatan-kita-22uQuvDyneD",
    createdAt: "2024-06-10T11:00:00Z",
    doctorReview: {
      id: "rev-kump-3",
      articleId: "art-kump-3",
      reviewerName: "dr. Siti Rahmawati, Sp.PD, FINASIM",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam",
      strNumber: "STR-3214-9901-2023",
      hospital: "RSUD Cipto Mangunkusumo",
      reviewNotes: "Materi ini sangat krusial untuk meningkatkan kewaspadaan preventif masyarakat. Deteksi dini sebelum fase komplikasi ireversibel terbukti menyelamatkan organ vital pasien.",
      approvalStatus: "Approved",
      reviewedAt: "2024-06-11T16:00:00Z",
    },
  },
  {
    id: "art-kump-4",
    title: "5 Manfaat Daun Insulin dan Cara Mengolahnya yang Tepat bagi Penderita Diabetes",
    category: "Nutrisi & Diet",
    summary: "Tanaman Smallanthus sonchifolius (daun yakon/daun insulin) populer sebagai terapi herbal pendamping diabetes. Kenali kandungan fruktooligosakarida dan batasan aman konsumsinya.",
    content: `
### Khasiat Daun Insulin (Smallanthus Sonchifolius)
Tanaman yang di Indonesia dikenal dengan sebutan **daun insulin** atau yakon berasal dari wilayah pegunungan Andes. Tanaman ini banyak diteliti karena kemampuannya membantu sensitivitas regulasi glukosa.

### 5 Manfaat Utama Daun Insulin Menurut Riset Farmakologi:
1. **Mengandung Fruktooligosakarida (FOS)**: Karbohidrat prebiotik yang tidak diserap sebagai glukosa oleh usus kecil, sehingga tidak menaikkan gula darah dan menyehatkan mikrobioma usus.
2. **Meningkatkan Sensitivitas Reseptor Insulin**: Senyawa polifenol aktif membantu memfasilitasi glukosa masuk ke dalam sel otot rangka.
3. **Efek Antioksidan Tinggi**: Melindungi sel beta pankreas dari radikal bebas dan stres oksidatif peradangan kronis.
4. **Membantu Kontrol Kolesterol**: Menekan kadar LDL (kolesterol jahat) yang sering menyertai dislipidemia diabetik.
5. **Mendukung Fungsi Hati**: Membantu menurunkan enzim transaminase hati akibat perlemakan hati diabetes (*fatty liver*).

### Cara Mengolah yang Higienis & Aman:
- Ambil 5 lembar daun insulin segar, cuci bersih di bawah air mengalir.
- Rebus dengan 2 gelas air (400 ml) hingga tersisa 1 gelas air.
- Saring dan minum saat hangat kuku, maksimal **1 kali sehari**.

### Peringatan Medis:
Rebusan daun insulin hanyalah terapi komplementer (pendukung). **Jangan pernah menghentikan konsumsi obat diabetes dari dokter** atau suntikan insulin tanpa pengawasan medis, karena dapat memicu komplikasi fatal ketoasidosis.
    `,
    readingTimeMinutes: 4,
    featuredImage: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01hd33wc454n19amv0zv8xjcmb.jpg",
    author: "Kumparan Food & Herbal Health",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/tips-dan-trik/5-manfaat-daun-insulin-dan-cara-mengolahnya-untuk-penderita-diabetes-21PR5cnBI6r",
    createdAt: "2025-08-18T10:00:00Z",
    doctorReview: {
      id: "rev-kump-4",
      articleId: "art-kump-4",
      reviewerName: "dr. Handoko Santoso, Sp.PD, KEMD",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam - Konsultan Endokrin, Metabolik & Diabetes",
      strNumber: "STR-3171-8892-2024",
      hospital: "RS Pusat Jantung dan Endokrin Nasional",
      reviewNotes: "Disetujui dengan penekanan keras pada peringatan medis: pasien dilarang mengganti obat resep dokter dengan jamu/herbal secara mandiri untuk menghindari komplikasi.",
      approvalStatus: "Approved",
      reviewedAt: "2025-08-19T13:20:00Z",
    },
  },
  {
    id: "art-kump-5",
    title: "5 Langkah Stabilkan Gula Darah pada Anak dengan Diabetes Tipe 1",
    category: "Pola Hidup & Aktivitas",
    summary: "Berbeda dengan diabetes tipe 2, anak dengan diabetes tipe 1 memerlukan manajemen insulin eksogen mutlak. Simak 5 langkah sinergi orang tua, sekolah, dan pemantauan karbohidrat harian.",
    content: `
### Memahami Diabetes Melitus Tipe 1 pada Anak
Diabetes Melitus Tipe 1 adalah kondisi autoimun di mana sistem imun tubuh secara keliru merusak sel beta pankreas, sehingga tubuh tidak mampu lagi memproduksi hormon insulin sama sekali.

Berikut adalah **5 langkah kunci** yang disarankan dokter anak endokrinologi dalam menjaga stabilitas gula darah anak:

### 1. Kepatuhan Rejimen Insulin Basal-Bolus
- Berikan insulin kerja panjang (basal) tepat waktu setiap hari untuk menjaga kebutuhan glukosa saat istirahat.
- Berikan insulin kerja cepat (bolus/prandial) 10-15 menit sebelum anak menyantap makanan utama.

### 2. Keterampilan 'Carb Counting' (Menghitung Karbohidrat)
- Orang tua dan anak perlu belajar membaca label nutrisi makanan.
- Hitung gram karbohidrat yang akan dikonsumsi anak untuk menentukan rasio unit insulin yang tepat (*Insulin-to-Carb Ratio*).

### 3. Terapkan 'Rule of 15' Saat Anak Hipoglikemia
- Jika gula darah anak drop di bawah **70 mg/dL** (anak terlihat pucat, berkeringat, atau lemas):
  - Segera beri 15 gram karbohidrat cepat serap (misal: 1/2 kotak teh manis atau 3 buah permen manis).
  - Tunggu 15 menit, lalu cek kembali gula darahnya. Ulangi jika masih di bawah target.

### 4. Edukasi Guru dan Pihak Sekolah
- Pastikan wali kelas dan UKS sekolah memahami kondisi diabetes anak, memiliki persediaan strip uji gula darah, dan tahu nomor darurat orang tua.

### 5. Dukungan Psikologis dan Kelompok Sebaya
- Libatkan anak dalam komunitas penderita diabetes seusianya agar anak tidak merasa berbeda atau terasing dalam aktivitas bermain dan berolahraga.
    `,
    readingTimeMinutes: 5,
    featuredImage: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01j48v4s9cxw2f01b9a5wqcx43.jpg",
    author: "Kumparan Mom & Health (Narasumber: DR Dr. Nur Rochmah, Sp.A)",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/kumparanmom/5-langkah-stabilkan-gula-darah-anak-diabetes-tipe-1-24yh3EvWhwA",
    createdAt: "2025-11-20T08:00:00Z",
    doctorReview: {
      id: "rev-kump-5",
      articleId: "art-kump-5",
      reviewerName: "dr. Siti Rahmawati, Sp.PD, FINASIM",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam",
      strNumber: "STR-3214-9901-2023",
      hospital: "RSUD Cipto Mangunkusumo",
      reviewNotes: "Panduan Rule of 15 dan Carb Counting sangat fundamental untuk mencegah bahaya hipoglikemia berat pada anak sekolah. Artikel disetujui.",
      approvalStatus: "Approved",
      reviewedAt: "2025-11-21T11:45:00Z",
    },
  },
  {
    id: "art-kump-6",
    title: "Sayuran & Minuman Jus yang Aman bagi Penderita Diabetes, Enggak Bikin Gula Darah Melonjak",
    category: "Nutrisi & Diet",
    summary: "Ketahui perbedaan sayuran tanpa zat tepung vs sayuran berpati tinggi, serta pilihan jus buah dan sayur segar yang aman tanpa menaikkan glukosa darah.",
    content: `
### Memilih Sayuran dan Jus yang Tepat bagi Pasien Diabetes
Sayuran memang kaya serat dan mineral, namun dalam manajemen klinis diabetes, penting untuk membedakan sayuran tanpa pati (non-starchy) dan sayuran berpati tinggi (starchy).

### 1. Sayuran Tanpa Pati (Sangat Aman & Dianjurkan):
Sayuran ini memiliki indeks glikemik sangat rendah (&lt; 15) dan kaya serat larut air yang memperlambat penyerapan glukosa:
- **Bayam, Kangkung, dan Sawi Hijau**: Kaya magnesium dan antioksidan lutein.
- **Brokoli dan Kembang Kol**: Mengandung sulforaphane yang membantu elastisitas dinding pembuluh darah.
- **Mentimun, Tomat, dan Pare**: Pare mengandung charantin yang memiliki efek menyerupai insulin ringan.

### 2. Sayuran Berpati Tinggi (Perlu Kontrol Porsi):
- **Jagung Manis & Kentang**: Mengandung karbohidrat tinggi. Jika dikonsumsi, kurangi porsi nasi Anda.
- **Wortel**: Mengandung glukosa alami lebih tinggi bila dimasak terlalu matang.

### 3. Pilihan Minuman Jus Sehat:
Alih-alih mengonsumsi jus buah kemasan dengan gula tambahan, penderita diabetes dapat membuat jus sayuran segar di rumah:
- Jus mentimun dengan perasan lemon segar.
- Jus bayam hijau dipadukan dengan apel hijau (porsi terbatas).
- Selalu minum tanpa gula pasir, susu kental manis, atau sirup perasa.
    `,
    readingTimeMinutes: 4,
    featuredImage: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1565170790/em7ur4mvh3viiatf4mvd.jpg",
    author: "Kumparan Food & Nutrition",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/kumparanfood/5-jus-yang-aman-dikonsumsi-penderita-diabetes-enggak-bikin-gula-darah-naik-1sv9rQ14R2f",
    createdAt: "2025-07-14T09:30:00Z",
    doctorReview: {
      id: "rev-kump-6",
      articleId: "art-kump-6",
      reviewerName: "dr. Martha Rosana, Sp.PD",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam - RSUPN Dr. Cipto Mangunkusumo",
      strNumber: "STR-3171-4458-2023",
      hospital: "RSUPN Dr. Cipto Mangunkusumo Jakarta",
      reviewNotes: "Edukasi perbedaan sayuran berpati vs non-pati dan tips jus sayur murni sangat tepat untuk meluruskan kesalahpahaman pasien.",
      approvalStatus: "Approved",
      reviewedAt: "2025-07-15T15:10:00Z",
    },
  },
  {
    id: "art-kump-7",
    title: "Mengenal tentang Penyakit Diabetes: Jenis, Gejala, hingga Pencegahannya",
    category: "Pola Hidup & Aktivitas",
    summary: "Panduan komprehensif memahami spektrum diabetes melitus, resistensi insulin seluler, hingga modifikasi gaya hidup untuk menekan risiko diabetes tipe 2 sejak usia muda.",
    content: `
### Apa Itu Diabetes Melitus?
Diabetes Melitus adalah kelainan metabolik kronis yang ditandai dengan kadar glukosa darah berada di atas rentang fisiologis normal. Glukosa yang seharusnya diserap oleh sel otot dan hati untuk energi justru terperangkap di aliran darah karena kekurangan atau disfungsi hormon insulin.

### Spektrum Jenis Diabetes:
1. **Diabetes Tipe 1**: Defisiensi insulin absolut akibat autoimun sel beta pankreas.
2. **Diabetes Tipe 2**: Resistensi insulin di mana sel tubuh tidak merespons insulin dengan baik, dipicu oleh obesitas sentral dan gaya hidup sedenter (*kurang gerak*).
3. **Diabetes Gestasional**: Terjadi pada masa kehamilan akibat hormon plasenta yang menghambat kerja insulin, berisiko komplikasi pada bayi bila tidak dikelola ketat.
4. **Prediabetes**: Kondisi gula darah di atas normal namun belum memenuhi kriteria diabetes (GDP 100-125 mg/dL). Masih dapat dicegah total (*reversibel*) dengan intervensi gaya hidup!

### 3 Langkah Pencegahan Primer:
- **Aktivitas Fisik Rutin**: Lakukan latihan aerobik intensitas sedang minimal 150 menit per minggu (misal jalan cepat 30 menit sehari, 5 hari seminggu).
- **Turunkan Berat Badan 5-7%**: Penurunan berat badan moderat terbukti meningkatkan sensitivitas insulin perifer hingga 58%.
- **Batasi Minuman Manis Kemasan**: Ganti minuman berpemanis dengan air mineral, teh hijau tanpa gula, atau infused water.
    `,
    readingTimeMinutes: 5,
    featuredImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    author: "Gariza Chandra Multazam / kumparan.com",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/topic/diabetes",
    createdAt: "2024-04-05T07:15:00Z",
    doctorReview: {
      id: "rev-kump-7",
      articleId: "art-kump-7",
      reviewerName: "dr. Handoko Santoso, Sp.PD, KEMD",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam - Konsultan Endokrin, Metabolik & Diabetes",
      strNumber: "STR-3171-8892-2024",
      hospital: "RS Pusat Jantung dan Endokrin Nasional",
      reviewNotes: "Edukasi prediabetes yang reversibel adalah poin utama yang harus disebarluaskan. Sangat disetujui untuk dipublikasikan kepada pembaca DIASERA.",
      approvalStatus: "Approved",
      reviewedAt: "2024-04-06T10:00:00Z",
    },
  },
  {
    id: "art-kump-8",
    title: "Panduan Cek Gula Darah yang Aman, Tepat, dan Mudah bagi Pasien Diabetes",
    category: "Pola Hidup & Aktivitas",
    summary: "Pelajari panduan pemeriksaan gula darah mandiri (glukometer), langkah penusukan steril tanpa nyeri, dan 4 waktu pemeriksaan krusial (puasa, 2 jam pasca makan, sebelum tidur).",
    content: `
Pemeriksaan Gula Darah Mandiri (Self-Monitoring of Blood Glucose / SMBG) menggunakan glukometer adalah mata dan telinga penderita diabetes dalam memantau kondisi fisiologis tubuh harian.

### 4 Waktu Utama Pengukuran yang Dianjurkan:
1. **Gula Darah Puasa (GDP)**:
   - Dilakukan segera setelah bangun tidur pagi hari setelah berpuasa minimal 8-10 jam (hanya boleh minum air putih).
   - Target normal diabetes terkontrol: **80 - 130 mg/dL**.
2. **Gula Darah 2 Jam Pasca Makan (Postprandial / GD2PP)**:
   - Waktu 2 jam dihitung sejak **suapan pertama**, bukan setelah Anda selesai makan!
   - Target normal diabetes: **< 180 mg/dL** (atau < 140 mg/dL untuk target ketat non-komplikasi).
3. **Sebelum Tidur (Bedtime)**:
   - Mencegah bahaya hipoglikemia nokturnal yang tidak disadari saat terlelap. Target: **100 - 140 mg/dL**.
4. **Sewaktu (Saat Gejala Muncul)**:
   - Jika Anda merasakan gemetar, keringat dingin, jantung berdebar, atau pandangan kabur, segera cek kadar gula darah.

### Langkah Penusukan Higienis & Nyaman:
1. Cuci tangan dengan air mengalir dan sabun, lalu keringkan sepenuhnya.
2. Pasang strip uji ke glukometer hingga menyala.
3. Tusuk di bagian samping ujung jari (bukan di bantalan tengah) untuk meminimalkan rasa nyeri.
4. Sentuhkan tetesan darah ke ujung strip dan tunggu hasil terbaca dalam 5 detik.
    `,
    readingTimeMinutes: 5,
    featuredImage: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1644227839/ahdj5bzhayccqrfxk3bq.jpg",
    author: "Kabar Harian / kumparan.com",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/kabar-harian/panduan-cek-gula-darah-yang-aman-dan-mudah-1xSZIey270u",
    createdAt: "2026-10-04T08:30:00Z",
    doctorReview: {
      id: "rev-kump-8",
      articleId: "art-kump-8",
      reviewerName: "dr. Siti Rahmawati, Sp.PD, FINASIM",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam",
      strNumber: "STR-3214-9901-2023",
      hospital: "RSUD Cipto Mangunkusumo",
      reviewNotes: "Verifikasi disetujui. Penekanan bahwa 2 jam postprandial dihitung sejak suapan pertama adalah poin edukasi penting yang sering disalahpahami masyarakat awam.",
      approvalStatus: "Approved",
      reviewedAt: "2026-10-04T16:45:00Z",
    },
  },
];
