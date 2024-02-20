import styles from "./AddQuotationButton.module.css";

export default function AddQuotationButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className={styles.addQuotationButtonWrapper}>
      <div className={styles.addQuotationButtonContainer} onClick={onClick}>
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
    </div>
  );
}
