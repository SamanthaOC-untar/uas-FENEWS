'use client';

import { Row, Col } from 'react-bootstrap';
import NewsCard from './NewsCard';
import SectionHeader from './SectionHeader';
import styles from '../app/styles/RelatedArticles.module.css';

interface News {
  id: number;
  title: string;
  category: string;
  time: string;
  image: string;
}

interface RelatedArticlesProps {
  articles: News[];
  category: string;
}

export default function RelatedArticles({ articles, category }: RelatedArticlesProps) {
  if (articles.length === 0) return null;
  
  return (
    <section className={styles.section}>
      <SectionHeader icon="bookmark-star" title={`Berita ${category} Lainnya`} />
      <Row>
        {articles.map((article) => (
          <Col lg={3} md={6} key={article.id} className="mb-4">
            <NewsCard
              title={article.title}
              category={article.category}
              time={article.time}
              image={article.image}
              size="medium"
              showCategoryOnImage={false}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}