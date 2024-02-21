import { QuoteItem } from "../../types/QuoteItem.interface";
import { numberToMoneyString } from "../../utils/moneyConversor";
import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";
import styles from "./CardTable.module.css";
import CustomTable from "../UI/CustomTable";

interface CardTableProps {
  quoteItems: QuoteItem[];
}

export default function CardTable({ quoteItems }: CardTableProps) {
  const animatedNumber = useAnimatedNumber(
    quoteItems.reduce((acc, item) => acc + item.quantity * item.unitCost, 0),
    2000
  );
  return (
    <CustomTable>
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
          <td className={styles.totalCell}>$ {animatedNumber}</td>
        </tr>
      </tbody>
    </CustomTable>
  );
}
