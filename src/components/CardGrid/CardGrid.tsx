"use client";
import { useState } from "react";
import styles from "./CardGrid.module.css";
import { QuotationCard } from "../../types/QuotationCard.interface";

import CardQuote from "../CardQuote/CardQuote";
import AddQuotationButton from "../AddQuotationButton/AddQuotationButton";

interface CardGridProps {
  quotes: QuotationCard[];
}

export default function CardGrid({ quotes }: CardGridProps) {
  // This is done because we are not tackling a real ddbb. If we did, we wouldn't need to use  'use client' or useEffect/useState , since we could do the actions server side and ask the ddbb for the updated array of data after deletion.
  const [tempQuotes, setQuotes] = useState<QuotationCard[]>(quotes);

  function handleRemove(index: number) {
    const updatedQuotes = [...tempQuotes];
    updatedQuotes.splice(index, 1);
    setQuotes(updatedQuotes);
  }

  return (
    <div className={styles.cardGrid}>
      {tempQuotes.map((q, index) => (
        <CardQuote key={index} quote={q} onRemove={() => handleRemove(index)} />
      ))}
      <AddQuotationButton />
    </div>
  );
}
