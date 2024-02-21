"use client";
import { QuotationCard } from "../../types/QuotationCard.interface";
import Tag from "../UI/Tag";
import styles from "./CardQuote.module.css";
import RatingTag from "../RatingTag/RatingTag";
import CardTable from "../CardTable/CardTable";
import { RemoveButton } from "../RemoveButton/RemoveButton";
import { selectTagVariant } from "../../utils/selectTagVariant";
import CustomButton from "../UI/CustomButton";
import QuotationsModal from "../QuotationsModal/QuotationsModal";
import { QuoteItemsPerSupplier } from "../../app/actions";
import { useDisclosure } from "@mantine/hooks";
import EditQuotationModal from "../EditQuotationsModal/EditQuotationsModal";

interface CardQuoteProps {
  quote: QuotationCard;
  onRemove: () => void;
  allItemsFromSupplier: QuoteItemsPerSupplier;
  onEdit: (data: string[]) => void;
}

export default function CardQuote({
  quote,
  onRemove,
  allItemsFromSupplier,
  onEdit,
}: CardQuoteProps) {
  const [opened, { open, close }] = useDisclosure();
  function handleRemove() {
    onRemove();
  }

  function handleEdit(ids: string[]) {
    close();
    onEdit(ids);
  }

  return (
    <div className={styles.cardWrapper}>
      {quote.isCavelaChoice && (
        <span className={styles.cavelasChoice}>Cavela&apos;s Choice ⭐</span>
      )}

      <div className={styles.cardContainer}>
        <div className={styles.cardRemoveContainer}>
          <RemoveButton onClick={handleRemove} />
        </div>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <h2>{quote.supplier.name}</h2>
            <div className={styles.tagContainer}>
              {quote.badges.map((badge, index) => (
                <Tag
                  key={index}
                  variant={selectTagVariant(index)}
                >{`#${badge[1]} ${badge[0]}`}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.cardHeaderRight}>
            <RatingTag rating={quote.supplier.score} />
          </div>
        </div>
        <div className={styles.cardBody}>
          <CardTable quoteItems={quote.quoteItems} />
        </div>
      </div>
      <div className={styles.cardFooter}>
        <CustomButton onClick={open} variant="secondary">
          Edit Quote
        </CustomButton>
        <CustomButton onClick={handleRemove} variant="primary">
          Add to my quotes
        </CustomButton>
      </div>
      <EditQuotationModal
        opened={opened}
        currentQuotes={[quote]}
        close={close}
        items={allItemsFromSupplier}
        onApply={(ids) => handleEdit(ids)}
      />
    </div>
  );
}
