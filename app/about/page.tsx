import styles from "./about.module.css";
import Link from "next/link";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaTiktok,
  FaThreads,
} from "react-icons/fa6";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>FENews</h1>
            <p>
              Mewartakan kebenaran dengan integritas, menginspirasi pembaca
              dengan keakuratan.
            </p>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className={styles.vision}>
        <div className={styles.textBlock}>
          <h2>Visi Kami</h2>
          <p>
            Menjadi sumber berita terpercaya yang menyajikan informasi dengan
            kedalaman analisis dan kecepatan digital masa kini.
          </p>
        </div>
        <div className={styles.textBlock}>
          <h2>Misi Kami</h2>
          <ul>
            <li>Menghadirkan berita yang akurat dan berimbang.</li>
            <li>Menjunjung tinggi prinsip jurnalisme etis.</li>
            <li>Memberikan nilai tambah bagi masyarakat melalui edukasi.</li>
          </ul>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.aboutPurpose}>
        <div className={styles.aboutContent}>
          <h2>Tentang FENews</h2>
          <p>
            FENews, platform berita independen Anda. Di tengah lautan informasi
            yang tak terbatas, FENews hadir sebagai respons atas kebutuhan
            mendesak akan jurnalisme yang jernih, mendalam, dan dapat dipercaya.
            Kami bukan sekadar penyampai berita, kami adalah analis yang bekerja
            untuk memberikan konteks pada peristiwa yang membentuk dunia kita.
            Tujuan utama kami adalah memberdayakan pembaca dengan pengetahuan
            yang relevan dan terverifikasi, sehingga Anda dapat mengambil
            keputusan yang lebih baik dalam kehidupan sehari-hari, baik itu di
            bidang teknologi, finansial, maupun gaya hidup. Kami percaya bahwa
            akses terhadap informasi berkualitas adalah hak, dan kami berupaya
            setiap hari untuk memenuhi hak tersebut dengan standar integritas
            tertinggi.
          </p>
        </div>
      </section>

      {/* Nilai */}
      <section className={styles.team}>
        <h2>Nilai Kami</h2>
        <div className={styles.teamGrid}>
          <div className={styles.card}>
            <h3>Integritas</h3>
            <p>
              Selalu menjunjung kejujuran dalam setiap berita yang kami tulis.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Inovasi</h3>
            <p>Beradaptasi dengan teknologi untuk menjangkau pembaca global.</p>
          </div>
          <div className={styles.card}>
            <h3>Kepercayaan</h3>
            <p>
              Membangun kepercayaan publik dengan transparansi dan konsistensi.
            </p>
          </div>
        </div>
      </section>

      {/* Etika & Komitmen */}
      <section className={styles.commitment}>
        <div className={styles.commitText}>
          <h2>Etika & Komitmen Kami</h2>
          <p>
            FENews berkomitmen terhadap prinsip jurnalisme yang akurat, jujur,
            dan berimbang. Kami percaya bahwa berita bukan sekadar informasi,
            tetapi sarana untuk memperkuat pemahaman dan empati di masyarakat.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          {/* Kolom Brand & Sosial Media */}
          <div className={styles.footerBrand}>
            <h4>FENews</h4>
            <p>
              Mewartakan kebenaran dengan integritas, menginspirasi pembaca
              dengan keakuratan.
            </p>
            <div className={styles.footerSocials}>
              <Link href="#" aria-label="Instagram">
                <FaInstagram />
              </Link>
              <Link href="#" aria-label="X Twitter">
                <FaXTwitter />
              </Link>
              <Link href="#" aria-label="Facebook">
                <FaFacebookF />
              </Link>
              <Link href="#" aria-label="Tiktok">
                <FaTiktok />
              </Link>
              <Link href="#" aria-label="Threads">
                <FaThreads />
              </Link>
            </div>
          </div>

          {/* Kolom Navigasi */}
          <div className={styles.footerLinks}>
            <h5>Navigasi</h5>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/subscription.html">Subscription</Link>
            <Link href="/profile.html">Profil</Link>
            <Link href="/login.html">Login</Link>
          </div>

          {/* Kolom Perusahaan */}
          <div className={styles.footerLinks}>
            <h5>Perusahaan</h5>
            <Link href="/#">Kontak</Link>
            <Link href="/#">Pedoman Media Siber</Link>
            <Link href="/#">Karier</Link>
            <Link href="/#">Beriklan</Link>
          </div>
        </div>

        {/* Bagian Copyright */}
        <div className={styles.footerBottom}>
          <p>&copy; 2025 FENews — Media Independen dan Inovatif</p>
        </div>
      </footer>
    </main>
  );
}
