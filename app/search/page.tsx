'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import NewsCard from '@/components/NewsCard';
import styles from './search.module.css';

interface NewsItem {
    id: number;
    title: string;
    category: string;
    date: Date;
    time: string;
    image: string;
    link?: string;
}

const ITEMS_PER_PAGE = 10;

const categories = [
    'Semua Kategori',
    'Bisnis',
    'Event',
    'Hukum',
    'Entertainment',
    'Politik',
    'Olahraga',
    'Internasional',
    'Teknologi',
    'Ekonomi',
    'Lingkungan'
];

const timeFilters = [
    { value: 'all', label: 'Semua Waktu' },
    { value: 'today', label: 'Hari Ini' },
    { value: 'yesterday', label: 'Kemarin' },
    { value: 'week', label: '7 Hari Terakhir' },
    { value: 'month', label: '30 Hari Terakhir' },
    { value: 'year', label: 'Tahun Ini' }
];

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [allNews, setAllNews] = useState<NewsItem[]>([]);
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/news');
                const data = await response.json();
                setAllNews(data);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        let filtered = allNews;

        if (query) {
            filtered = filtered.filter(news =>
                news.title.toLowerCase().includes(query.toLowerCase()) ||
                news.category.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (selectedCategory !== 'Semua Kategori') {
            filtered = filtered.filter(news => news.category === selectedCategory);
        }

        if (selectedTimeFilter !== 'all') {
            const referenceDate = new Date('2025-11-15');
            const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

            filtered = filtered.filter(news => {
                const newsDate = new Date(news.date);
                const newsDayOnly = new Date(newsDate.getFullYear(), newsDate.getMonth(), newsDate.getDate());
                const daysDiff = Math.floor((today.getTime() - newsDayOnly.getTime()) / (1000 * 60 * 60 * 24));

                switch (selectedTimeFilter) {
                    case 'today':
                        return daysDiff === 0;
                    case 'yesterday':
                        return daysDiff === 1;
                    case 'week':
                        return daysDiff >= 0 && daysDiff <= 7;
                    case 'month':
                        return daysDiff >= 0 && daysDiff <= 30;
                    case 'year':
                        return newsDate.getFullYear() === 2025;
                    default:
                        return true;
                }
            });
        }

        setFilteredNews(filtered);
        setCurrentPage(1);
    }, [query, selectedCategory, selectedTimeFilter, allNews]);

    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentNews = filteredNews.slice(startIndex, endIndex);

    const getPaginationItems = () => {
        const items = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (currentPage > 1) {
            items.push(
                <Pagination.First key="first" onClick={() => setCurrentPage(1)} />
            );
            items.push(
                <Pagination.Prev
                    key="prev"
                    onClick={() => setCurrentPage(currentPage - 1)}
                />
            );
        }

        if (startPage > 1) {
            items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
        }

        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        if (endPage < totalPages) {
            items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
        }

        if (currentPage < totalPages) {
            items.push(
                <Pagination.Next
                    key="next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
            );
            items.push(
                <Pagination.Last key="last" onClick={() => setCurrentPage(totalPages)} />
            );
        }

        return items;
    };

    const handleResetFilters = () => {
        setSelectedCategory('Semua Kategori');
        setSelectedTimeFilter('all');
        if (query) {
            window.history.pushState({}, '', '/search');
            window.location.reload();
        }
    };

    return (
        <Container className={styles.searchContainer}>
            <div className={styles.searchHeader}>
                <h1 className={styles.searchTitle}>
                    <i className="bi bi-clock-history"></i>
                    <span>{query ? `Hasil Pencarian: "${query}"` : 'Berita Terbaru'}</span>
                </h1>
                <p className={styles.resultCount}>
                    <i className="bi bi-newspaper"></i>
                    <span>Ditemukan {filteredNews.length} berita</span>
                </p>
            </div>
            <div className={styles.filterSection}>
                <Row className="g-3">
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <Form.Label className={styles.filterLabel}>
                                <i className="bi bi-funnel-fill"></i>
                                Kategori
                            </Form.Label>
                            <Form.Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={styles.filterSelect}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <Form.Label className={styles.filterLabel}>
                                <i className="bi bi-calendar-range"></i>
                                Waktu
                            </Form.Label>
                            <Form.Select
                                value={selectedTimeFilter}
                                onChange={(e) => setSelectedTimeFilter(e.target.value)}
                                className={styles.filterSelect}
                            >
                                {timeFilters.map(filter => (
                                    <option key={filter.value} value={filter.value}>
                                        {filter.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            {isLoading ? (
                <div className={styles.loading}>
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Memuat berita...</p>
                </div>
            ) : currentNews.length > 0 ? (
                <>
                    <div className={styles.newsList}>
                        {currentNews.map((news) => (
                            <div key={news.id} className={styles.newsItem}>
                                <NewsCard
                                    id={news.id}
                                    title={news.title}
                                    category={news.category}
                                    time={news.time}
                                    image={news.image}
                                    link={news.link}
                                    variant="horizontal"
                                />
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className={styles.paginationWrapper}>
                            <div className={styles.pageInfo}>
                                <i className="bi bi-file-text"></i>
                                Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredNews.length)} dari {filteredNews.length} berita
                            </div>
                            <Pagination className={styles.pagination}>
                                {getPaginationItems()}
                            </Pagination>
                            <div className={styles.pageCounter}>
                                Halaman {currentPage} dari {totalPages}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.noResults}>
                    <i className="bi bi-inbox"></i>
                    <h3>Tidak ada berita ditemukan</h3>
                    <p>
                        {query
                            ? `Tidak ada hasil untuk "${query}"`
                            : selectedCategory !== 'Semua Kategori' || selectedTimeFilter !== 'all'
                                ? 'Tidak ada berita dengan filter yang dipilih'
                                : 'Tidak ada berita tersedia'
                        }
                    </p>
                    <button
                        className={styles.resetButton}
                        onClick={handleResetFilters}
                    >
                        <i className="bi bi-arrow-counterclockwise"></i>
                        <span>Reset Filter</span>
                    </button>
                </div>
            )}
        </Container>
    );
}