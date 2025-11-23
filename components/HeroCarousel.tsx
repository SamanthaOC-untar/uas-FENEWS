'use client';

import { Carousel } from 'react-bootstrap';
import styles from '../app/styles/HeroCarousel.module.css';
import Link from "next/link";

interface News {
  id: number;
  title: string;
  category: string;
  time: string;
  image: string;
  link?: string;
}

interface HeroCarouselProps {
  news: News[];
}

export default function HeroCarousel({ news }: HeroCarouselProps) {
  return (
    <Carousel fade interval={5000} className={styles.carousel}>
      {news.map((item) => (
        <Carousel.Item key={item.id} className={styles.carouselItem}>

          <Link href={item.link ?? "#"} className={styles.link}>
            <div className={styles.imageWrapper}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.carouselImage}
              />
              <div className={styles.overlay} />
            </div>
            <Carousel.Caption className={styles.caption}>
              <span className={styles.category}>{item.category}</span>
              <h2 className={styles.title}>{item.title}</h2>
              <div className={styles.meta}>
                <i className="bi bi-clock"></i>
                <span>{item.time}</span>
              </div>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}