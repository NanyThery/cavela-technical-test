import styles from "./Skeletons.module.css";
export default function CardQuotationSkeleton({ noTag = false }) {
  return (
    <div className={styles.skeletonContainer}>
      {!noTag && <div className={styles.cavelasChoice}></div>}
      <div className={styles.cardContainer}></div>
    </div>
  );
}
