import styles from "./Skeletons.module.css";
export default function CardQuotationSkeleton({
  noTag = false,
  noButton = false,
}) {
  return (
    <div className={styles.skeletonContainer}>
      {!noTag && <div className={styles.cavelasChoice}></div>}
      <div className={styles.cardContainer}></div>
      <div className={styles.cardFooter}>
        {!noButton && <div className={styles.cardButton}></div>}
        {!noButton && <div className={styles.cardButton}></div>}
      </div>
    </div>
  );
}
