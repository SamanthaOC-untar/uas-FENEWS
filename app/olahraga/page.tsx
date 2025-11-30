'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Link from 'next/link';
import NewsCard from '@/components/NewsCard';
import SectionHeader from '@/components/SectionHeader';
import styles from './olahraga.module.css';

interface Article {
  id: string;
  headline: string;
  category: string;
  timestamp: string;
  image: string;
  excerpt: string;
}

export default function OlahragaPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSportsArticles();
  }, []);

  const fetchSportsArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/news/category/olahraga');
      
      if (!response.ok) {
        throw new Error('Failed to fetch sports articles');
      }
      
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError('Gagal memuat artikel olahraga');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Memuat artikel olahraga...</p>
      </Container>
    );
  }

  return (
    <Container className={styles.olahragaContainer}>
      <SectionHeader 
        icon="trophy"
        title="Olahraga"
      />

      {error && (
        <Row className="mb-4">
          <Col lg={12}>
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {articles.length === 0 ? (
        <Row>
          <Col lg={12} className="text-center py-5">
            <p className={styles.noArticles}>Belum ada artikel olahraga</p>
            <Link href="/" className="btn btn-primary">
              Kembali ke Beranda
            </Link>
          </Col>
        </Row>
      ) : (
        <>
          {/* Featured Article */}
          {articles.length > 0 && (
            <Row className="mb-5">
              <Col lg={12}>
                <div className={styles.featuredArticle}>
                  <img 
                    src={articles[0].image} 
                    alt={articles[0].headline}
                    className={styles.featuredImage}
                  />
                  <div className={styles.featuredContent}>
                    <span className={styles.category}>Olahraga</span>
                    <h2 className={styles.featuredTitle}>{articles[0].headline}</h2>
                    <p className={styles.featuredExcerpt}>{articles[0].excerpt}</p>
                    <small className={styles.timestamp}>{articles[0].timestamp}</small>
                    <br />
                    <Link href={`/details/${articles[0].id}`} className="btn btn-primary mt-3">
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}

          {/* Other Articles Grid */}
          {articles.length > 1 && (
            <>
              <h3 className={styles.sectionTitle}>Artikel Lainnya</h3>
              <Row>
                {articles.slice(1).map((article) => (
                  <Col lg={4} md={6} key={article.id} className="mb-4">
                    <NewsCard
                      title={article.headline}
                      category={article.category}
                      time={article.timestamp}
                      image={article.image}
                      link={`/details/${article.id}`}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      )}
    </Container>
  );
}
