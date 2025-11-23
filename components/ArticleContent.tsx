'use client';

import styles from '../app/styles/ArticleContet.module.css';

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div 
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}