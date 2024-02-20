import styles from "./CardGrid.module.css";

export default function CardGrid({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={styles.cardGrid}>{children}</div>;
}
