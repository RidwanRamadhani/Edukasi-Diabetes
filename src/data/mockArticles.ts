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
    featuredImage: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1561786399/nibmpd1b5wajgzf91nkj.jpg",
    author: "Gariza Chandra Multazam / kumparan.com",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/gariza-chandra-multazam/mengenal-tentang-penyakit-diabetes-jenis-gejala-hingga-pencegahannya-20MjAyu6l6l",
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
  {
    id: "art-kump-9",
    title: "5 Tips agar Terhindar dari Risiko Diabetes Menurut Ahli Gizi",
    category: "Nutrisi & Diet",
    summary: "Ahli gizi klinis membagikan 5 tips utama mencegah diabetes melitus tipe 2: perbanyak serat larut air, pilih karbohidrat kompleks indeks glikemik rendah, batasi makanan ultra-proses, dan konsisten jam makan.",
    content: `
### Kiat Pencegahan Primer Diabetes dari Perspektif Ahli Gizi
Diabetes Melitus Tipe 2 tidak terjadi dalam semalam. Penyakit ini berkembang secara perlahan akibat beban glukosa kronis yang membuat sel beta pankreas kelelahan dan sel tubuh resisten terhadap insulin. Kabar baiknya, riset membuktikan bahwa **perubahan pola makan dan nutrisi mampu menurunkan risiko diabetes hingga 60%**.

Berikut 5 tips penting yang dianjurkan oleh para ahli gizi:

### 1. Perbanyak Serat Larut Air (Soluble Fiber)
- Serat larut air (seperti dalam oat, chia seed, apel, kacang merah, dan agar-agar rumput laut) membentuk gel di saluran pencernaan.
- Gel ini memperlambat penyerapan glukosa ke aliran darah sehingga lonjakan gula darah pasca makan (*postprandial spike*) dapat diredam secara signifikan.
- **Target:** Konsumsi minimal **25 - 30 gram serat** setiap hari.

### 2. Ganti Karbohidrat Sederhana dengan Karbohidrat Kompleks
- Hindari nasi putih berlebih, tepung terigu olahan, roti manis, dan mi instan.
- Beralihlah ke karbohidrat kompleks dengan Indeks Glikemik (GI) rendah (&lt; 55), seperti nasi merah, jagung rebus, ubi jalar kukus, atau beras basmati.
- Karbohidrat kompleks dipecah menjadi glukosa secara perlahan, memberikan energi yang stabil tanpa membebani pankreas.

### 3. Kendalikan Ukuran Porsi (Portion Control)
- Gunakan metode 'Piring Model T':
  - **1/2 Piring:** Sayuran non-tepung (bayam, brokoli, labu siam, selada, kangkung).
  - **1/4 Piring:** Protein berkualitas tinggi rendah lemak (tempe, tahu, ikan, dada ayam tanpa kulit, telur).
  - **1/4 Piring:** Karbohidrat kompleks (nasi merah, kentang rebus beserta kulitnya).

### 4. Waspadai Gula Tersembunyi (Hidden Sugar)
- Banyak orang merasa sudah mengurangi gula karena tidak minum teh manis, namun masih sering mengonsumsi jus buah kemasan, yoghurt manis, saus salad kemasan, dan biskuit.
- Selalu periksa label informasi nilai gizi: jika kandungan gula lebih dari **10 gram per sajian**, sebaiknya hindari atau batasi konsumsinya.

### 5. Jangan Lewatkan Sarapan Sehat
- Melewatkan sarapan sering memicu rasa lapar berlebihan pada siang hari, yang berujung pada konsumsi kalori berlebih dan 'sugar craving' di sore hari.
    `,
    readingTimeMinutes: 4,
    featuredImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    author: "Kumparan Food & Nutrition / Ahli Gizi Klinis",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/kumparanfood/5-tips-agar-terhindar-dari-risiko-diabetes-menurut-ahli-gizi-21zR3zBPX3n",
    createdAt: "2025-08-10T09:00:00Z",
    doctorReview: {
      id: "rev-kump-9",
      articleId: "art-kump-9",
      reviewerName: "dr. Martha Rosana, Sp.PD",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam - RSUPN Dr. Cipto Mangunkusumo",
      strNumber: "STR-3171-4458-2023",
      hospital: "RSUPN Dr. Cipto Mangunkusumo Jakarta",
      reviewNotes: "Tips nutrisi preventif yang sangat aplikatif. Pemilihan karbohidrat kompleks dengan serat tinggi terbukti menjaga glukosa postprandial stabil dan mencegah resistensi insulin sejak dini.",
      approvalStatus: "Approved",
      reviewedAt: "2025-08-11T14:00:00Z",
    },
  },
  {
    id: "art-kump-10",
    title: "Cara Mencegah Diabetes: Hitung Asupan Kalori dan Jadilah Smart Eater",
    category: "Nutrisi & Diet",
    summary: "Kunci utama pencegahan diabetes tipe 2 adalah mencegah kelebihan kalori harian yang memicu penumpukan lemak viseral. Pelajari rumus BMR, defisit kalori sehat, dan cara membaca nutrition facts.",
    content: `
### Mengapa Menghitung Kalori Krusial dalam Mencegah Diabetes?
Banyak orang mengira diabetes hanya disebabkan oleh makan gula. Padahal, faktor biologis terbesar terjadinya resistensi insulin adalah **penumpukan lemak perut (lemak viseral)** akibat surplus kalori harian yang terjadi terus-menerus selama berbulan-bulan atau bertahun-tahun.

Saat lemak viseral menumpuk di sekitar hati dan pankreas, organ tersebut kehilangan kemampuan merespons hormon insulin dengan baik.

### Menghitung Kebutuhan Kalori Harian (Basal Metabolic Rate):
- Rata-rata pria dewasa sehat membutuhkan sekitar **2.000 - 2.200 kkal/hari**.
- Rata-rata wanita dewasa sehat membutuhkan sekitar **1.600 - 1.800 kkal/hari**.
- Jika Anda memiliki berat badan berlebih (BMI &gt; 25), targetkan defisit kalori moderat sebesar **300 - 500 kkal per hari** untuk menurunkan berat badan 0.5 kg per minggu.

### Langkah Menjadi 'Smart Eater':
1. **Pahami 'Density' Kalori Makanan**:
   - Satu mangkok sayur bening bayam hanya mengandung sekitar 40 kkal, namun sangat mengenyangkan karena volume serat dan airnya.
   - Sebaliknya, satu potong gorengan bakwan bisa mengandung hingga 150-200 kkal dengan indeks glikemik tinggi.
2. **Gunakan Rumus Membaca Informasi Nilai Gizi**:
   - Cek **Jumlah Sajian per Kemasan**: Jika kemasan berisi 2 sajian dan tertera 200 kkal, maka menghabiskan seluruh kemasan berarti Anda memasukkan 400 kkal.
   - Perhatikan gram karbohidrat total dan gula tambahan.
3. **Makan Perlahan (Mindful Eating)**:
   - Butuh waktu sekitar **20 menit** bagi sinyal hormon leptin dari lambung untuk sampai ke otak memberi tahu bahwa tubuh sudah kenyang.
   - Makan terlalu cepat sering membuat kita makan berlebihan sebelum rasa kenyang disadari.
    `,
    readingTimeMinutes: 5,
    featuredImage: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80",
    author: "Kumparan Health & Food",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/kumparanfood/cara-mencegah-diabetes-hitung-asupan-kalori-1sFiRERXtyJ",
    createdAt: "2025-06-22T08:15:00Z",
    doctorReview: {
      id: "rev-kump-10",
      articleId: "art-kump-10",
      reviewerName: "dr. Handoko Santoso, Sp.PD, KEMD",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam - Konsultan Endokrin, Metabolik & Diabetes",
      strNumber: "STR-3171-8892-2024",
      hospital: "RS Pusat Jantung dan Endokrin Nasional",
      reviewNotes: "Menjadi smart eater dengan menghitung kalori dan membaca label kemasan adalah benteng pertahanan terbaik melawan obesitas sentral sebagai pemicu nomor satu diabetes melitus.",
      approvalStatus: "Approved",
      reviewedAt: "2025-06-23T11:30:00Z",
    },
  },
  {
    id: "art-kump-11",
    title: "Yuk Ketahui Batas Konsumsi Gula, Garam, dan Lemak (GGL) Sesuai Anjuran Kemenkes",
    category: "Nutrisi & Diet",
    summary: "Kementerian Kesehatan RI menetapkan pedoman konsumsi harian 'G4 G1 L5': maksimal 4 sendok makan gula, 1 sendok teh garam, dan 5 sendok makan minyak/lemak untuk mencegah diabetes, hipertensi, dan dislipidemia.",
    content: `
### Mengenal Aturan Emas 'G4 G1 L5' Kemenkes RI
Kementerian Kesehatan Republik Indonesia secara konsisten mengampanyekan pembatasan konsumsi **Gula, Garam, dan Lemak (GGL)** guna menekan lonjakan angka penyakit tidak menular (PTM), khususnya diabetes melitus, penyakit jantung koroner, dan stroke.

Untuk memudahkan masyarakat mengingat takaran aman harian per orang, Kemenkes merumuskan pedoman **G4 - G1 - L5**:

### 1. Gula: Maksimal 4 Sendok Makan (50 Gram) per Hari
- Mengonsumsi gula lebih dari 50 gram per hari meningkatkan risiko diabetes melitus tipe 2 hingga **3 kali lipat**.
- Hati-hati: Satu gelas minuman boba kekinian atau kopi susu dengan sirup pemanis rata-rata mengandung **35 hingga 48 gram gula** — hampir menghabiskan seluruh kuota harian Anda dalam satu kali minum!

### 2. Garam: Maksimal 1 Sendok Teh (5 Gram / 2.000 mg Natrium) per Hari
- Asupan garam berlebih memicu hipertensi (tekanan darah tinggi).
- Kombinasi diabetes dan hipertensi mempercepat kerusakan nefron ginjal hingga memicu gagal ginjal kronis.

### 3. Lemak/Minyak: Maksimal 5 Sendok Makan (67 Gram) per Hari
- Lemak jenuh dan lemak trans memicu perlemakan hati (*fatty liver*) yang memperparah resistensi insulin.
- Kurangi makanan yang digoreng rendam minyak (*deep frying*), ganti dengan metode rebus, kukus, panggang, atau tumis dengan sedikit minyak zaitun/kanola.

### Tips Praktis Menjalankan G4 G1 L5 di Rumah:
- Selalu minta 'less sugar' (25% gula atau tanpa gula tambahan) saat memesan minuman di luar rumah.
- Jadikan air putih dingin atau infused water buah sebagai pilihan pelepas dahaga utama.
- Gunakan rempah-rempah alami (bawang putih, kunyit, jahe, lada) untuk memperkaya rasa masakan tanpa perlu banyak garam atau penyedap berlebih.
    `,
    readingTimeMinutes: 4,
    featuredImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    author: "Kumparan Food & Kemenkes RI",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/kumparanfood/yuk-ketahui-batas-konsumsi-gula-garam-dan-lemak-sesuai-anjuran-kemenkes-1vla7GyLNFl",
    createdAt: "2025-05-18T10:30:00Z",
    doctorReview: {
      id: "rev-kump-11",
      articleId: "art-kump-11",
      reviewerName: "dr. Siti Rahmawati, Sp.PD, FINASIM",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam",
      strNumber: "STR-3214-9901-2023",
      hospital: "RSUD Cipto Mangunkusumo",
      reviewNotes: "Pedoman G4 G1 L5 adalah standar baku nasional pencegahan penyakit tidak menular. Sangat disarankan dipahami dan diterapkan oleh seluruh keluarga.",
      approvalStatus: "Approved",
      reviewedAt: "2025-05-19T13:00:00Z",
    },
  },
  {
    id: "art-kump-12",
    title: "Rekomendasi Olahraga Efektif untuk Cegah dan Kontrol Diabetes Tipe 2",
    category: "Pola Hidup & Aktivitas",
    summary: "Olahraga aerobik dan latihan beban ringan membantu memasukkan glukosa darah ke dalam sel otot tanpa memerlukan insulin melalui transporter GLUT-4. Kenali jenis, jadwal, dan durasi minimal 150 menit per minggu.",
    content: `
### Bagaimana Olahraga Mampu Menurunkan Gula Darah Secara Alami?
Saat Anda berolahraga, otot-otot rangka mengalami kontraksi aktif. Kontraksi otot ini secara otomatis merangsang molekul pembawa glukosa yang disebut **GLUT-4** untuk bergerak ke permukaan membran sel otot.

Artinya: **Otot dapat menyerap glukosa dari aliran darah untuk dibakar menjadi energi secara langsung tanpa bergantung pada hormon insulin!**

Inilah alasan mengapa olahraga dijuluki sebagai 'obat alami paling ampuh' untuk mencegah dan mengendalikan diabetes.

### Rekomendasi Olahraga Menurut Panduan PERKENI & ADA:
1. **Olahraga Kardio / Aerobik (Minimal 150 Menit/Minggu)**:
   - **Jalan Cepat Pagi**: 30 menit per hari, 5 kali seminggu. Lakukan dengan kecepatan di mana Anda masih bisa berbicara tetapi tidak bisa bernyanyi (*talk test*).
   - **Bersepeda Santai**: Membakar kalori tanpa membebani sendi lutut.
   - **Berenang**: Melibatkan seluruh kelompok otot besar tubuh dan melancarkan sirkulasi pembuluh darah.
2. **Latihan Ketahanan / Beban Ringan (2-3 Kali/Minggu)**:
   - Massa otot adalah tempat penampungan glukosa terbesar di tubuh (menyimpan hingga 80% glukosa pasca makan).
   - Melatih otot dengan squat, push-up dinding, atau dumbel ringan 1-2 kg akan memperbesar 'tangki penampungan glukosa' tubuh.

### 3 Aturan Aman Berolahraga:
- Jangan berolahraga saat perut kosong total jika Anda mengonsumsi obat diabetes untuk menghindari hipoglikemia.
- Selalu kenakan sepatu yang pas dan kaos kaki bersih untuk melindungi telapak kaki dari lecet.
- Selingi dengan peregangan ringan dan minum cukup air putih sebelum, saat, dan sesudah berolahraga.
    `,
    readingTimeMinutes: 5,
    featuredImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
    author: "Berita Hari Ini / kumparan.com",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/berita-hari-ini/rekomendasi-olahraga-untuk-penderita-diabetes-tipe-2-22b8HlP4JWT",
    createdAt: "2025-09-02T07:45:00Z",
    doctorReview: {
      id: "rev-kump-12",
      articleId: "art-kump-12",
      reviewerName: "dr. Handoko Santoso, Sp.PD, KEMD",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam - Konsultan Endokrin, Metabolik & Diabetes",
      strNumber: "STR-3171-8892-2024",
      hospital: "RS Pusat Jantung dan Endokrin Nasional",
      reviewNotes: "Aktivitas fisik 150 menit per minggu adalah pilar paling hemat biaya namun paling efektif untuk menaikkan sensitivitas insulin dan menurunkan HbA1c hingga 0.8%.",
      approvalStatus: "Approved",
      reviewedAt: "2025-09-03T10:15:00Z",
    },
  },
  {
    id: "art-kump-13",
    title: "Kenali Gejala Prediabetes Sebelum Terlambat: Fase Emas yang Masih Bisa Sembuh Total",
    category: "Pencegahan Komplikasi",
    summary: "Kadar gula darah puasa 100-125 mg/dL menandakan prediabetes. Ketahui tanda awal seperti acanthosis nigricans (leher menghitam), kelelahan kronis, dan strategi pemulihan total (reversal) sebelum menjadi diabetes permanen.",
    content: `
### Mengapa Prediabetes Disebut Sebagai 'Fase Emas'?
Prediabetes adalah kondisi ketika kadar gula darah seseorang sudah berada di atas batas normal, namun belum setinggi kriteria diabetes tipe 2. 

Banyak orang tidak menyadari bahwa **pada fase prediabetes, kondisi metabolik tubuh masih 100% REVERSIBEL (bisa pulih normal sepenuhnya)** jika ditangani dengan tepat sebelum sel-sel pankreas mengalami kerusakan permanen.

### Parameter Angka Prediabetes:
- **Gula Darah Puasa (GDP)**: 100 – 125 mg/dL (Normal: &lt; 100 mg/dL).
- **Gula Darah 2 Jam Pasca Makan (GD2PP)**: 140 – 199 mg/dL (Normal: &lt; 140 mg/dL).
- **HbA1c**: 5.7% – 6.4% (Normal: &lt; 5.7%).

### Gejala Samar yang Kerap Diabaikan:
1. **Acanthosis Nigricans**: Kulit di lipatan leher bagian belakang, ketiak, atau selangkangan tampak menggelap dan menebal seperti daki yang sulit dibersihkan. Ini adalah tanda khas tingginya kadar insulin dalam darah (*hiperinsulinemia*).
2. **Kelelahan Kronis Pasca Makan (*Food Coma*)**: Selalu merasa sangat mengantuk, lemas, dan kehilangan konsentrasi setelah mengonsumsi makanan berkarbohidrat tinggi.
3. **Peningkatan Lemak di Perut**: Lingkar perut pria &gt; 90 cm atau wanita &gt; 80 cm.
4. **Luka atau Memar yang Lebih Lambat Sembuh**.

### 3 Langkah Membalikkan Prediabetes Menjadi Normal Kembali:
1. **Turunkan Berat Badan 7%**: Jika berat badan Anda 70 kg, menurunkan 5 kg saja sudah cukup untuk meningkatkan sensitivitas insulin secara dramatis.
2. **Rutin Olahraga 30 Menit/Hari**: Membakar timbunan glukosa berlebih dan mengembalikan fungsi sel beta pankreas.
3. **Puasa Intermittent / Atur Jeda Makan**: Berikan waktu jeda istirahat 12-14 jam di malam hari tanpa asupan kalori (hanya minum air putih) agar pankreas dapat beregenerasi.
    `,
    readingTimeMinutes: 5,
    featuredImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    author: "Kumparan Mom & Family Health",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/kumparanmom/kenali-gejala-prediabetes-pada-anak-sebelum-terlambat-26dUH3BOq21",
    createdAt: "2025-10-12T09:20:00Z",
    doctorReview: {
      id: "rev-kump-13",
      articleId: "art-kump-13",
      reviewerName: "dr. Martha Rosana, Sp.PD",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam - RSUPN Dr. Cipto Mangunkusumo",
      strNumber: "STR-3171-4458-2023",
      hospital: "RSUPN Dr. Cipto Mangunkusumo Jakarta",
      reviewNotes: "Fase prediabetes adalah satu-satunya jendela kesempatan di mana kelainan metabolisme masih 100% bisa dibalikkan menjadi normal (reversibel) tanpa perlu terapi obat seumur hidup.",
      approvalStatus: "Approved",
      reviewedAt: "2025-10-13T16:00:00Z",
    },
  },
  {
    id: "art-kump-14",
    title: "Cegah Diabetes dengan Perilaku CERDIK Sesuai Pedoman Kemenkes RI",
    category: "Pola Hidup & Aktivitas",
    summary: "Strategi komprehensif Kemenkes RI melalui gerakan CERDIK: Cek kesehatan berkala, Enyahkan asap rokok, Rajin aktivitas fisik, Diet seimbang, Istirahat cukup 7-8 jam, dan Kelola stres untuk memangkas risiko diabetes hingga 58%.",
    content: `
### Menangkal Diabetes dengan Rumus 'CERDIK' Kemenkes RI
Kementerian Kesehatan RI telah merancang strategi pencegahan penyakit tidak menular (PTM) yang sangat mudah dihafal dan dijalankan oleh masyarakat bernama **CERDIK**.

Berikut penjabaran 6 langkah CERDIK dalam konteks pencegahan diabetes melitus:

### 1. C - Cek Kesehatan Secara Berkala
- Lakukan skrining risiko diabetes dan pemeriksaan gula darah minimal **1 tahun sekali** bagi individu sehat, atau **6 bulan sekali** jika memiliki riwayat keluarga dengan diabetes atau berat badan berlebih.
- Gunakan fitur Cek Risiko FINDRISC di DIASERA untuk memetakan potensi risiko 10 tahun ke depan.

### 2. E - Enyahkan Asap Rokok
- Nikotin dalam rokok merusak sel endotel pembuluh darah dan memicu peradangan sistemik yang memperburuk resistensi insulin.
- Perokok aktif memiliki risiko **30 - 40% lebih tinggi** terkena diabetes tipe 2 dibanding orang yang tidak merokok.

### 3. R - Rajin Beraktivitas Fisik
- Jangan biarkan tubuh diam (*sedentary*) lebih dari 2 jam berturut-turut. Lakukan peregangan atau jalan kaki 5 menit di sela-sela waktu kerja di kantor.
- Targetkan minimal 7.500 langkah per hari.

### 4. D - Diet Sehat dan Seimbang
- Terapkan konsep 'Isi Piringku': batasi gula, garam, dan minyak, serta penuhi kebutuhan mikronutrien dari sayuran hijau dan buah segar berindeks glikemik rendah.

### 5. I - Istirahat yang Cukup (7 - 8 Jam)
- Kurang tidur kronis (&lt; 6 jam per malam) meningkatkan hormon kortisol dan ghrelin yang merangsang nafsu makan berlebih serta membuat gula darah pagi melonjak tinggi.

### 6. K - Kelola Stres dengan Baik
- Saat mengalami stres emosional berat, tubuh memproduksi hormon kortisol dan adrenalin yang memicu hati memompa cadangan glukosa ke aliran darah.
- Lakukan relaksasi, meditasi, hobi yang menyenangkan, atau beribadah untuk menjaga ketenangan sistem saraf.
    `,
    readingTimeMinutes: 5,
    featuredImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    author: "Humas Kesehatan / kumparan.com",
    sourceMedia: "kumparan.com",
    sourceUrl: "https://kumparan.com/humas-kota-bandung/cegah-diabetes-dengan-perilaku-cerdik-1s9dh47j78c",
    createdAt: "2025-11-05T08:00:00Z",
    doctorReview: {
      id: "rev-kump-14",
      articleId: "art-kump-14",
      reviewerName: "dr. Siti Rahmawati, Sp.PD, FINASIM",
      reviewerTitle: "Dokter Spesialis Penyakit Dalam",
      strNumber: "STR-3214-9901-2023",
      hospital: "RSUD Cipto Mangunkusumo",
      reviewNotes: "Perilaku CERDIK merangkum semua pilar primer pencegahan diabetes secara terpadu. Edukasi ini wajib dibaca oleh semua masyarakat usia produktif.",
      approvalStatus: "Approved",
      reviewedAt: "2025-11-06T15:30:00Z",
    },
  },
];
