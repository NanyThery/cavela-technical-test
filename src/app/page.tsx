"use client";
import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid/CardGrid";
import SectionTitle from "../components/UI/SectionTitle";
import fetchQuotes from "./actions";
import CardQuote from "@/components/CardQuote/CardQuote";
import { QuotationCard } from "../types/QuotationCard.interface";
import CardGridSkeletons from "../components/Skeletons/CardGridSkeletons";
import AddQuotationButton from "../components/AddQuotationButton/AddQuotationButton";

export default function HomePage() {
  const [quotes, setQuotes] = useState<QuotationCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This is done because we are not tackling a real ddbb. If we did, we wouldn't need to use  'use client' or useEffect/useState , since we could do the actions server side and ask the ddbb for the updated array of data after deletion.

  useEffect(() => {
    async function fetchQuotesFun() {
      const quotes = await fetchQuotes();
      setLoading(false);
      setQuotes(quotes);
    }

    fetchQuotesFun();
  }, []);

  function handleRemove(index: number) {
    const updatedQuotes = [...quotes];
    updatedQuotes.splice(index, 1);
    setQuotes(updatedQuotes);
  }

  return (
    <div>
      <SectionTitle title="Quote Selection" />
      {loading ? (
        <CardGridSkeletons />
      ) : (
        <CardGrid>
          {quotes.map((q, index) => (
            <CardQuote
              key={index}
              quote={q}
              onRemove={() => handleRemove(index)}
            />
          ))}
          <AddQuotationButton onClick={() => setIsModalOpen(!isModalOpen)} />
        </CardGrid>
      )}
    </div>
  );
}
