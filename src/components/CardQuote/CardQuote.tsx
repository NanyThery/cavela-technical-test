import { QuotationCard } from "../../types/QuotationCard.interface";
import Tag from "../UI/Tag";
import styles from "./CardQuote.module.css";
import RatingTag from "../RatingTag/RatingTag";
import CardTable from "../CardTable/CardTable";

interface CardQuoteProps {
  quote: QuotationCard;
}

export default function CardQuote({ quote }: CardQuoteProps) {
  return (
    <div className={styles.cardWrapper}>
      <span className={styles.cavelasChoice}>
        {quote.isCavelaChoice && `Cavela's Choice ⭐`}
      </span>

      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <h2>{quote.supplier.name}</h2>
            <div className={styles.tagContainer}>
              {quote.badges.map((badge, index) => (
                <Tag key={index}>{`#${badge[1]} ${badge[0]}`}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.cardHeaderRight}>
            <RatingTag rating={quote.supplier.score} />
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.quoteItemsContainer}>
            <CardTable quoteItems={quote.quoteItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
