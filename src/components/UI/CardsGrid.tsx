import styles from "./CardsGrid.module.css";
export default function CardsGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardGrid}>{children}</div>;
}
