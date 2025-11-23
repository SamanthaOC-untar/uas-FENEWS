'use client';

import { ListGroup } from 'react-bootstrap';
import styles from '../app/styles/PopularNews.module.css';
import Link from "next/link";

interface News {
  id: number;
  title: string;
  category: string;
  time: string;
  link?: string;
}

interface PopularNewsProps {
  news: News[];
}

export default function PopularNews({ news }: PopularNewsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <i className="bi bi-fire"></i>
        <h3 className={styles.title}>Populer</h3>
      </div>
      <ListGroup variant="flush" className={styles.list}>
        {news.map((item, index) => (
          <ListGroup.Item key={item.id} className={styles.item}>
            <Link href={item.link ?? "#"} className={styles.link}>
              <div className={styles.rank}>{index + 1}</div>
              <div className={styles.content}>
                <h4 className={styles.newsTitle}>{item.title}</h4>
                <div className={styles.meta}>
                  <span className={styles.category}>{item.category}</span>
                  <span className={styles.divider}>•</span>
                  <span className={styles.time}>{item.time}</span>
                </div>
              </div>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}