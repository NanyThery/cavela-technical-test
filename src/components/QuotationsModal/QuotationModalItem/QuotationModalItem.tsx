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
  disabled: boolean;
}

export default function QuotationModalItem({
  item,
  disabled = false,
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
                  className={`${disabled && styles.isDisabled}`}
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
                      disabled={disabled}
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
