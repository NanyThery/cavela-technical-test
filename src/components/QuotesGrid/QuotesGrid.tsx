"use client";
import { useState } from "react";
import { QuotationCard } from "../../types/QuotationCard.interface";
import CardQuote from "../CardQuote/CardQuote";
import AddQuotationButton from "../AddQuotationButton/AddQuotationButton";
import CardsGrid from "../UI/CardsGrid";
import { QuoteItemsPerSupplier, createQuote } from "../../app/actions";

interface CardGridProps {
  quotes: QuotationCard[];
  allItems: QuoteItemsPerSupplier;
}

export default function QuotesGrid({ quotes, allItems }: CardGridProps) {
  // This is done because we are not tackling a real ddbb. If we did, we wouldn't need to use  'use client' or useEffect/useState , since we could do the actions server side and ask the ddbb for the updated array of data after deletion.
  const [tempQuotes, setQuotes] = useState<QuotationCard[]>(quotes);

  function handleRemove(index: number) {
    const updatedQuotes = [...tempQuotes];
    updatedQuotes.splice(index, 1);
    setQuotes(updatedQuotes);
  }

  async function handleAdd(itemIds: string[]) {
    const newQuote = await createQuote(itemIds);
    const updatedQuotes = [...tempQuotes];
    updatedQuotes.push(newQuote);
    setQuotes(updatedQuotes);
  }

  async function handleEdit(itemIds: string[], index: number) {
    const newQuote = await createQuote(itemIds);
    const updatedQuotes = [...tempQuotes];
    updatedQuotes[index].quoteItems = newQuote.quoteItems;

    setQuotes(updatedQuotes);
  }

  return (
    <CardsGrid>
      {tempQuotes.map((q, index) => {
        const supplierItems: QuoteItemsPerSupplier = {
          [q.supplier.supplierId]: allItems[q.supplier.supplierId],
        };
        return (
          <CardQuote
            key={index}
            quote={q}
            onRemove={() => handleRemove(index)}
            allItemsFromSupplier={supplierItems}
            onEdit={(data: string[]) => handleEdit(data, index)}
          />
        );
      })}
      <AddQuotationButton
        currentQuotes={tempQuotes}
        allItems={allItems}
        onAdd={(data: string[]) => handleAdd(data)}
      />
    </CardsGrid>
  );
}
