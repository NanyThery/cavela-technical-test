import styles from "./AddQuotationButton.module.css";
import { useDisclosure } from "@mantine/hooks";
import QuotationsModal from "../QuotationsModal/QuotationsModal";
import { QuoteItemsPerSupplier } from "../../app/actions";

import { QuotationCard } from "../../types/QuotationCard.interface";

interface AddQuotationButtonProps {
  allItems: QuoteItemsPerSupplier;
  currentQuotes: QuotationCard[];
  onAdd: (data: string[]) => void;
}

export default function AddQuotationButton({
  allItems,
  currentQuotes,
  onAdd,
}: AddQuotationButtonProps) {
  const [opened, { open, close }] = useDisclosure();

  function handleAdd(data: string[]) {
    onAdd(data);
    close();
  }

  return (
    <div className={styles.addQuotationButtonWrapper}>
      <div className={styles.addQuotationButtonContainer} onClick={open}>
        <div className={styles.addQuotationButtonIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M256 112v288M400 256H112"
            />
          </svg>
        </div>
      </div>
      <QuotationsModal
        opened={opened}
        close={close}
        items={allItems}
        currentQuotes={currentQuotes}
        onAdd={(data: string[]) => handleAdd(data)}
      />
    </div>
  );
}
