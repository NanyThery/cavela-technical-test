import { QuoteItem } from "../../types/QuoteItem.interface";
import { numberToMoneyString } from "../../utils/moneyConversor";
import styles from "./CardTable.module.css";

interface CardTableProps {
  quoteItems: QuoteItem[];
}

export default function CardTable({ quoteItems }: CardTableProps) {
  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th scope="col">Variant</th>
          <th scope="col">Quantity</th>
          <th scope="col">Unit Cost</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {quoteItems.map((item, index) => (
          <tr className={styles.variantRow} key={index}>
            <td>{item.variant}</td>
            <td>{item.quantity}</td>
            <td>{numberToMoneyString(item.unitCost)}</td>
            <td>{numberToMoneyString(item.quantity * item.unitCost)}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={3}></td>
          <td className={styles.totalCell}>
            {numberToMoneyString(
              quoteItems.reduce(
                (acc, item) => acc + item.quantity * item.unitCost,
                0
              )
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
