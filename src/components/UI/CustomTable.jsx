import styles from "./CustomTable.module.css";

export default function CustomTable({ children }) {
  return (
    <div className={styles.quoteItemsContainer}>
      <table className={styles.tableContainer}>{children}</table>
    </div>
  );
}
