'use client';

import styles from '../app/styles/OlahragaTemplate.module.css';

interface ArticleTemplateProps {
  headline: string;
  timestamp: string;
  image: string;
  excerpt: string;
  content: string;
  author?: string;
  category?: string;
}

export default function OlahragaTemplate({
  headline,
  timestamp,
  image,
  excerpt,
  content,
  author = 'FE News',
  category = 'Olahraga',
}: ArticleTemplateProps) {

  return (
    <article className={styles.article}>
      {/* Hero Image */}
      <div className={styles.heroSection}>
        <img src={image} alt={headline} className={styles.heroImage} />
        <div className={styles.heroOverlay}></div>
        <div className={styles.categoryBadge}>{category}</div>
      </div>

      {/* Article Header */}
      <div className={styles.headerContainer}>
        <h1 className={styles.headline}>{headline}</h1>
        
        <div className={styles.metaInfo}>
          <div className={styles.authorInfo}>
            <div className={styles.authorAvatar}>
              {author.charAt(0).toUpperCase()}
            </div>
            <div className={styles.authorDetails}>
              <div className={styles.authorName}>{author}</div>
              <div className={styles.timestamp}>{timestamp}</div>
            </div>
          </div>
          <div className={styles.shareButtons}>
            <button className={styles.shareBtn} title="Share">
              <i className="bi bi-share"></i>
            </button>
            <button className={styles.shareBtn} title="Bookmark">
              <i className="bi bi-bookmark"></i>
            </button>
          </div>
        </div>

        {/* Excerpt */}
        <p className={styles.excerpt}>{excerpt}</p>
      </div>

      {/* Main Content */}
      <div className={styles.contentContainer}>
        <div className={styles.contentBody}>
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Quick Stats */}
          <div className={styles.statsBox}>
            <h3 className={styles.statsTitle}>Statistik Baca</h3>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Waktu Baca</span>
              <span className={styles.statValue}>5 min</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Views</span>
              <span className={styles.statValue}>1.2K</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Likes</span>
              <span className={styles.statValue}>284</span>
            </div>
          </div>

          {/* Related Tags */}
          <div className={styles.tagsBox}>
            <h3 className={styles.tagsTitle}>Tag Terkait</h3>
            <div className={styles.tags}>
              <span className={styles.tag}>#Olahraga</span>
              <span className={styles.tag}>#Berita</span>
              <span className={styles.tag}>#Indonesia</span>
            </div>
          </div>

          {/* Advertisement Space */}
          <div className={styles.adBox}>
            <div className={styles.adPlaceholder}>
              <p>Ruang Iklan</p>
              <small>300x250</small>
            </div>
          </div>
        </aside>
      </div>

      {/* Article Footer */}
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.reactions}>
            <button className={styles.reactionBtn}>
              <i className="bi bi-hand-thumbs-up"></i> Suka
            </button>
            <button className={styles.reactionBtn}>
              <i className="bi bi-chat-dots"></i> Komentar
            </button>
            <button className={styles.reactionBtn}>
              <i className="bi bi-share"></i> Bagikan
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <section className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>Komentar</h2>
        <div className={styles.commentForm}>
          <textarea 
            className={styles.commentInput}
            placeholder="Berikan komentar Anda..."
            rows={3}
          />
          <button className={styles.submitBtn}>Kirim Komentar</button>
        </div>
        <div className={styles.commentsList}>
          <p className={styles.noComments}>Belum ada komentar</p>
        </div>
      </section>
    </article>
  );
}
