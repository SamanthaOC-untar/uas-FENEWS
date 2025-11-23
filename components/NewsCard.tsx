'use client';

import { Card } from 'react-bootstrap';
import Link from 'next/link';
import styles from '../app/styles/NewsCard.module.css';

interface NewsCardProps {
  id?: number;
  title: string;
  category: string;
  time: string;
  image: string;
  link?: string;
  size?: 'large' | 'medium' | 'small';
  variant?: 'vertical' | 'horizontal';
  showCategoryOnImage?: boolean;
}

export default function NewsCard({
  id,
  title,
  category,
  time,
  image,
  link,
  size = 'medium',
  variant = 'vertical',
  showCategoryOnImage = false,
}: NewsCardProps) {
  const cardContent = variant === 'horizontal' ? (
    <Card className={styles.horizontalCard}>
      <div className={styles.horizontalImage}>
        <img src={image} alt={title} />
      </div>
      <Card.Body className={styles.horizontalBody}>
        <span className={styles.categoryText}>{category}</span>
        <Card.Title className={styles.horizontalTitle}>{title}</Card.Title>
        <div className={styles.meta}>
          <i className="bi bi-clock"></i>
          <span>{time}</span>
        </div>
      </Card.Body>
    </Card>
  ) : (
    <Card className={`${styles.card} ${styles[size]}`}>
      <div className={styles.imageWrapper}>
        <Card.Img variant="top" src={image} className={styles.image} />
        {showCategoryOnImage && (
          <div className={styles.categoryBadge}>{category}</div>
        )}
      </div>
      <Card.Body className={styles.body}>
        {!showCategoryOnImage && (
          <span className={styles.categoryText}>{category}</span>
        )}
        <Card.Title className={styles.title}>{title}</Card.Title>
        <div className={styles.meta}>
          <i className="bi bi-clock"></i>
          <span>{time}</span>
        </div>
      </Card.Body>
    </Card>
  );

  if (link) {
    return (
      <Link href={link} className={styles.link}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}