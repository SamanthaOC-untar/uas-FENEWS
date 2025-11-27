'use client'; 

import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
// CSS
import styles from './tekno.module.css'; 

// Components
import HeroCarousel from '@/components/HeroCarousel'; 
import NewsCard from '@/components/NewsCard'; 
import SectionHeader from '@/components/SectionHeader';
import PopularNews from '@/components/PopularNews'; 

interface Article {
    id: number; title: string; category: string; time: string; image: string; link?: string;
}

const mockArticles: Article[] = [
    { id: 1, title: 'Ini Password yang Paling Banyak Digunakan di Dunia, Rawan Di-hack', category: 'TEKNOLOGI', time: '2 hari yang lalu', image: '/images/tekno1.jpg', link: '/details/1' },
    { id: 2, title: 'Harga iPhone Fold Diprediksi Nyaris Tembus Rp 40 Juta', category: 'Gadget', time: '1 hari lalu', image: '/images/tekno2.jpg', link: '/details/2' },
    { id: 3, title: 'Dear Gamer, Jangan Harap Harga Steam Machine Murah Saat Diluncurkan', category: 'Game', time: '2 hari lalu', image: '/images/tekno3.jpg', link: '/details/3' },
    
    { id: 4, title: 'Game PlayStation Diskon Hingga 80% di Steam, Ada yang Rp 40 Ribu', category: 'Internet', time: '3 hari lalu', image: '/images/tekno4.jpg', link: '/details/4' },
    { id: 5, title: 'AMD Bakal Naikkan Harga Kartu Grafis Gara-gara Harga RAM Melonjak', category: 'Hardware', time: '4 hari lalu', image: '/images/tekno5.jpg', link: '/details/5' },
    { id: 6, title: 'Google Rilis Nano Banana Pro, Edit Gambar Kini Jauh Lebih Gila', category: 'AI', time: '1 minggu lalu', image: '/images/tekno6.jpg', link: '/details/6' },

    { id: 7, title: 'Copy-Paste di Windows 11 Kini Dilengkapi AI', category: 'Populer', time: '1 hari lalu', image: '/images/tekno7.jpg', link: '/details/7' },
    { id: 8, title: 'Siap-siap, iPhone Hingga MacBook Murah Segera Rilis', category: 'Populer', time: '2 hari lalu', image: '/images/tekno8.jpg', link: '/details/8' },
    { id: 9, title: 'Diterjang Banjir, Komdigi Rilis Daftar Daerah yang Hilang Sinyal di Aceh', category: 'Populer', time: '3 hari lalu', image: '/images/tekno9.jpg', link: '/details/9' },
    { id: 10, title: 'Kisah Anak Magang Resign Gara-gara Nvidia RTX 5060', category: 'Populer', time: '4 hari lalu', image: '/images/tekno10.jpg', link: '/details/10' },
];

function getTechnologyArticles(): Article[] {
    return mockArticles;
}

export default function TechnologyNewsPage() {
    const articles = getTechnologyArticles();
    
    const heroArticles = articles.slice(0, 3);          
    const mainArticles = articles.slice(3, 6);      
    const sidebarPopularNews = articles.slice(0, 10);    

    return (
        <>
            <main className={`${styles.pageContainer} ${styles.withHeaderMargin}`}>
                
                {/* Carousel */}
                <div className="mb-10">
                    <HeroCarousel news={heroArticles} /> 
                </div>

                <div className={styles.horizontalDivider} /> 
                
                {/* 2. BAGIAN UTAMA DAN SIDEBAR */}
                <div className={styles.contentGrid}>
                    
                    {/* Kolom Berita Utama */}
                    <section>
                        <SectionHeader icon="book-open" title="BERITA UTAMA" />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {mainArticles.map(article => (
                                // Menggunakan class untuk spacing
                                <div key={article.id} className={styles.newsCardWrapper}> 
                                    <NewsCard 
                                        id={article.id}
                                        title={article.title}
                                        category={article.category}
                                        time={article.time}
                                        image={article.image}
                                        link={article.link}
                                        size="medium"
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Tombol Load More */}
                        <div className="mt-8 text-center">
                            <button 
                                className={styles.loadMoreButton} 
                            >
                                Muat Lebih Banyak Artikel
                            </button>
                        </div>
                    </section>

                    {/* Kolom Populer */}
                    <aside className={styles.sidebarContainer}>
                        
                        <SectionHeader icon="fire" title="POPULER" /> 
                        
                        <div className="pb-4"> 
                            <PopularNews news={sidebarPopularNews} /> 
                        </div>
                        
                        <div className="mt-6 text-right">
                            <a 
                                href="/popular" 
                                className={`text-sm font-semibold hover:underline ${styles.sidebarSeeMore}`} 
                            >
                                Lihat Selengkapnya →
                            </a>
                        </div>
                    </aside>
                </div>
            </main>

            {/* FOOTER */}
            <footer className={styles.footer}>
                <div className="container mx-auto">
                    <p className="text-sm m-0 mb-1">
                        &copy; {new Date().getFullYear()} **FE-NEWS**. Hak Cipta Dilindungi.
                    </p>
                    <p className={`text-xs m-0 ${styles.footerTextMuted}`}>
                        Dibuat menggunakan Next.js dan React. Versi 1.0.0
                    </p>
                </div>
            </footer>
        </>
    );
}