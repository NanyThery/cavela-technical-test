"use client";
import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid/CardGrid";
import SectionTitle from "../components/UI/SectionTitle";
import fetchQuotes from "./actions";
import CardQuote from "@/components/CardQuote/CardQuote";
import { QuotationCard } from "../types/QuotationCard.interface";
import CardGridSkeletons from "../components/Skeletons/CardGridSkeletons";

export default function HomePage() {
  const [quotes, setQuotes] = useState<QuotationCard[]>([]);
  const [loading, setLoading] = useState(true);

  // This is done because we are not tackling a real ddbb. If we had a real data base, we wouldn't need to use  'use client' or useEffect, since we could do the actions server side and ask the ddbb for the updated array of data after deletion.

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
        </CardGrid>
      )}
    </div>
  );
}
