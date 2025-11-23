import { Container, Row, Col } from 'react-bootstrap';
import HeroCarousel from '../components/HeroCarousel';
import NewsCard from '../components/NewsCard';
import PopularNews from '../components/PopularNews';
import SectionHeader from '../components/SectionHeader';
import styles from './page.module.css';

async function getHeroNews() {
  const res = await fetch('http://localhost:3000/api/news/hero', {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

async function getPopularNews() {
  const res = await fetch('http://localhost:3000/api/news/popular', {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

async function getMainNews() {
  const res = await fetch('http://localhost:3000/api/news?limit=4', {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

async function getCategories() {
  const res = await fetch('http://localhost:3000/api/news/categories', {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

async function getCategoryNews(category: string) {
  const res = await fetch(
    `http://localhost:3000/api/news?category=${category}&limit=4`,
    { cache: 'no-store' }
  );
  if (!res.ok) return [];
  return res.json();
}

async function getLatestNews() {
  const res = await fetch('http://localhost:3000/api/news?limit=8', {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const [heroNews, popularNews, mainNews, categories, latestNews] = await Promise.all([
    getHeroNews(),
    getPopularNews(),
    getMainNews(),
    getCategories(),
    getLatestNews(),
  ]);

  const categoryNewsPromises = categories.slice(0, 6).map((cat: string) => 
    getCategoryNews(cat)
  );
  const categoryNewsResults = await Promise.all(categoryNewsPromises);
  
  const categoryNews: Record<string, any[]> = {};
  categories.slice(0, 6).forEach((cat: string, index: number) => {
    categoryNews[cat] = categoryNewsResults[index];
  });

  return (
    <Container fluid="lg" className={styles.container}>
      <HeroCarousel news={heroNews} />
      <Row className={styles.mainSection}>
        <Col lg={8} className="mb-4">
          <SectionHeader icon="newspaper" title="Berita Utama" />
          <Row>
            {mainNews.map((news: any) => (
              <Col md={6} key={news.id} className="mb-4">
                <NewsCard
                  id={news.id}
                  title={news.title}
                  category={news.category}
                  time={news.time}
                  image={news.image}
                  link={news.link}
                  size="large"
                  showCategoryOnImage={false}
                />
              </Col>
            ))}
          </Row>
        </Col>
        
        <Col lg={4} className="mb-4">
          <PopularNews news={popularNews} />
        </Col>
      </Row>

      {categories.slice(0, 6).map((category: string) => (
        <section key={category} className={styles.categorySection}>
          <SectionHeader icon="bookmark" title={category} />
          <Row>
            {categoryNews[category]?.map((news: any) => (
              <Col lg={3} md={6} key={news.id} className="mb-4">
                <NewsCard
                  id={news.id}
                  title={news.title}
                  category={news.category}
                  time={news.time}
                  image={news.image}
                  link={news.link}
                  size="medium"
                  showCategoryOnImage={false}
                />
              </Col>
            ))}
          </Row>
        </section>
      ))}

      <section className={styles.latestSection}>
        <SectionHeader icon="clock-history" title="Berita Terbaru" />
        <div className={styles.latestGrid}>
          {latestNews.map((news: any) => (
            <NewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              category={news.category}
              time={news.time}
              image={news.image}
              link={news.link}
              variant="horizontal"
            />
          ))}
        </div>
      </section>
    </Container>
  );
}