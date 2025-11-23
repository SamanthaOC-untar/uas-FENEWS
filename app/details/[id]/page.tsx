import { Container, Row, Col } from 'react-bootstrap';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/ArticleContent';
import RelatedArticles from '@/components/RelatedArticles';
import styles from './page.module.css';

async function getArticle(id: string) {
  const res = await fetch(`http://localhost:3000/api/details/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  return res.json();
}

async function getRelatedArticles(category: string) {
  const res = await fetch(
    `http://localhost:3000/api/details/related/${category}`,
    { cache: 'no-store' }
  );
  
  if (!res.ok) return [];
  return res.json();
}

export default async function DetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  const article = await getArticle(id);
  
  if (!article) {
    notFound();
  }
  
  const relatedArticles = await getRelatedArticles(article.category);
  const articleUrl = `http://localhost:3000/details/${id}`;
  
  return (
    <Container fluid="lg" className={styles.container}>
      <Row>
        <Col lg={8} className="mx-auto">
          <article className={styles.article}>
            <nav className={styles.breadcrumb}>
              <a href="/">Home</a>
              <i className="bi bi-chevron-right"></i>
              <span className={styles.category}>{article.category}</span>
              <i className="bi bi-chevron-right"></i>
              <span>Artikel</span>
            </nav>
            <header className={styles.header}>
              <span className={styles.categoryBadge}>{article.category}</span>
              <h1 className={styles.title}>{article.headline}</h1>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <i className="bi bi-calendar3"></i>
                  <span>{article.timestamp}</span>
                </div>
                <div className={styles.metaItem}>
                  <i className="bi bi-eye"></i>
                  <span>123 views</span>
                </div>
              </div>
            </header>
            <div className={styles.imageWrapper}>
              <img 
                src={article.image} 
                alt={article.headline}
                className={styles.image}
              />
              <p className={styles.caption}>{article.excerpt}</p>
            </div>
            <ArticleContent content={article.content} />
            <div className={styles.tags}>
              <i className="bi bi-tags"></i>
              <span className={styles.tag}>{article.category}</span>
              <span className={styles.tag}>Berita</span>
              <span className={styles.tag}>Indonesia</span>
            </div>
          </article>
          
          <RelatedArticles articles={relatedArticles} category={article.category} />
          
        </Col>
      </Row>
    </Container>
  );
}