import CardQuotationSkeleton from "./CardQuotationSkeleton";
import styles from "./Skeletons.module.css";

export default function CardGridSkeletons() {
  return (
    <div className={styles.cardGridSkeleton}>
      <CardQuotationSkeleton></CardQuotationSkeleton>
      <CardQuotationSkeleton></CardQuotationSkeleton>
      <CardQuotationSkeleton
        noTag={true}
        noButton={true}
      ></CardQuotationSkeleton>
    </div>
  );
}
