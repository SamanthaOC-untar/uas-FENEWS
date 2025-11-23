import styles from '../app/styles/SectionHeader.module.css';

interface SectionHeaderProps {
  icon: string;
  title: string;
}

export default function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <i className={`bi bi-${icon} ${styles.icon}`}></i>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}