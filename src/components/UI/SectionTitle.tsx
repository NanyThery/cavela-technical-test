import styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  title: string;
}
export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.titleText}>{title}</h1>
      <div className={styles.titleLine}></div>
    </div>
  );
}
