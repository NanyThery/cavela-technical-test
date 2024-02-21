import { QuotationCard } from "../../../types/QuotationCard.interface";
import { QuoteItem } from "../../../types/QuoteItem.interface";
import { Supplier } from "../../../types/Supplier.interface";
import RatingTag from "../../RatingTag/RatingTag";
import CustomTable from "../../UI/CustomTable";
import styles from "./QuotationModalItem.module.css";

interface QuotationModalItemProps {
  item: {
    supplier: Supplier;
    quoteItems: QuoteItem[];
  };
  currentQuotes: QuotationCard[];
  isSupplierAdded: boolean;
}

export default function QuotationModalItem({
  item,
  isSupplierAdded = false,
  currentQuotes,
}: QuotationModalItemProps) {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.supplierContainer}>
        <h4>{item.supplier.name}</h4>
        <RatingTag rating={item.supplier.score} />
      </div>
      <div>
        <CustomTable>
          <tbody>
            {item.quoteItems.map((quoteItem, index) => {
              return (
                <tr
                  key={quoteItem.quoteItemId}
                  className={`${isSupplierAdded && styles.isDisabled}`}
                >
                  <td className={styles.variantsCell}>{quoteItem.variant}</td>
                  <td>{quoteItem.quantity}</td>
                  <td>{quoteItem.unitCost}</td>
                  <td>{quoteItem.leadTime}</td>
                  <td>{quoteItem.moq}</td>
                  <td>{quoteItem.sampleCost}</td>
                  <td className={styles.isCavelaChoice}>
                    <span>{quoteItem.isCavelasChoice && `⭐`}</span>
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      name="quotationItemId"
                      value={quoteItem.quoteItemId}
                      disabled={isSupplierAdded}
                      defaultChecked={currentQuotes.some(
                        (quote) =>
                          quote.quoteItems.filter(
                            (item) => item.quoteItemId === quoteItem.quoteItemId
                          ).length > 0
                      )}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </CustomTable>
      </div>
    </div>
  );
}
