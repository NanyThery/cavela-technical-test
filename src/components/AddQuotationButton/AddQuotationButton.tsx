import { Group, Modal } from "@mantine/core";
import styles from "./AddQuotationButton.module.css";
import { useDisclosure } from "@mantine/hooks";
import CustomButton from "../UI/CustomButton";
import QuotationsModal from "../QuotationsModal/QuotationsModal";
import { fetchQuoteItemsPerSupplier } from "../../app/actions";

export default function AddQuotationButton({}) {
  const [opened, { open, close }] = useDisclosure();
  // const quoteItems = await fetchQuoteItemsPerSupplier();
  const quoteItems = {};

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
      <QuotationsModal opened={opened} close={close} items={quoteItems} />
    </div>
  );
}
