import styles from "./RatingTag.module.css";

interface RatingTagProps {
  rating: number;
}

function getRatingStyles(rating: number) {
  if (rating >= 4.5) {
    return "highRating";
  } else if (rating >= 3.5) {
    return "mediumRating";
  } else {
    return "lowRating";
  }
}

export default function RatingTag({ rating }: RatingTagProps) {
  return (
    <div className={styles[getRatingStyles(rating)]}>
      <span className={styles.ratingText}>{rating}</span>
    </div>
  );
}
