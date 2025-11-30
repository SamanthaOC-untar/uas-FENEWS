'use client';

import { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import OlahragaTemplate from '@/components/OlahragaTemplate';

interface Article {
  id: string;
  headline: string;
  category: string;
  timestamp: string;
  image: string;
  excerpt: string;
  content: string;
}

export default function OlahragaDetailPage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const id = params.id;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/articles/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError('Gagal memuat artikel. Silakan coba lagi.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Memuat artikel...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Artikel tidak ditemukan</Alert>
      </Container>
    );
  }

  return <OlahragaTemplate {...article} />;
}
