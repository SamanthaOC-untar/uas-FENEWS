'use client';

import OlahragaTemplate from '@/components/OlahragaTemplate';

export default function PreviewOlahragaTemplate() {
  const sampleArticle = {
    id: 'preview-1',
    headline: 'Lando Norris Raih Gelar Juara Dunia F1 2025 Setelah Kemenangan Dramatis di Abu Dhabi',
    timestamp: '29 November 2025, 18:30 WIB',
    image: '/images/gmbr32.jpeg',
    excerpt:
      'Lando Norris berhasil meraih gelar juara dunia Formula 1 setelah mengalahkan Max Verstappen dalam pertandingan yang sangat sengit di Sirkuit Yas Marina, Abu Dhabi.',
    content: `
      <h2>Kemenangan Spektakuler di Putaran Terakhir</h2>
      <p>
        Dalam aksi yang mendebarkan, Lando Norris dari Tim McLaren berhasil menyingkirkan Max Verstappen 
        di lap terakhir dengan manuver yang berani namun penuh perhitungan. Pebalap Inggris berusia 25 tahun 
        ini merayakan kemenangan dengan antusias tinggi.
      </p>

      <h2>Perjalanan Menuju Juara</h2>
      <p>
        Musim 2025 telah menjadi musim yang penuh tantangan bagi Norris. Sejak awal musim, dia telah 
        menunjukkan performa yang konsisten dan terus meningkat. Dengan dukungan penuh dari tim McLaren, 
        Norris berhasil mengumpulkan poin-poin penting di setiap Grand Prix.
      </p>

      <h3>Strategi Tim McLaren Terbukti Efektif</h3>
      <p>
        Tim McLaren menjalankan strategi pit stop yang sempurna pada hari itu. Keputusan untuk mengganti 
        ban Norris pada waktu yang tepat memungkinkannya untuk keluar lebih cepat dari Verstappen dan 
        mengambil posisi terdepan.
      </p>

      <p>
        <strong>Kutipan dari Lando Norris:</strong> "Saya tidak bisa mempercayai ini. Tim McLaren telah 
        bekerja sangat keras sepanjang musim ini. Terima kasih kepada semua orang yang mendukung saya. 
        Ini adalah mimpi yang menjadi kenyataan!"
      </p>

      <h2>Prestasi Luar Biasa McLaren</h2>
      <p>
        Kemenangan Norris juga membawa kejayaan bagi Tim McLaren. Dengan pencapaian ini, McLaren berhasil 
        merebut penghargaan Konstruktor terbaik untuk musim 2025, mengakhiri era dominasi Red Bull Racing 
        dalam beberapa tahun terakhir.
      </p>

      <h3>Apa Selanjutnya untuk Norris?</h3>
      <p>
        Setelah meraih gelar juara dunia, Norris akan fokus pada musim 2026. Dia diperkirakan akan tetap 
        bersama McLaren dan berusaha untuk mempertahankan titel juaranya. Persaingan di F1 akan terus 
        menjadi sengit dengan berbagai tim yang terus meningkatkan performa mereka.
      </p>

      <p>
        Pencapaian Lando Norris ini menunjukkan bahwa kerja keras, dedikasi, dan dukungan tim yang kuat 
        dapat membawa seseorang meraih mimpi tertingginya. Selamat kepada Lando Norris sebagai Juara 
        Dunia Formula 1 2025!
      </p>
    `,
    author: 'Budi Santoso',
    category: 'Olahraga',
  };

  return <OlahragaTemplate {...sampleArticle} />;
}
