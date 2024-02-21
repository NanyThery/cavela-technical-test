import QuotesGrid from "../components/QuotesGrid/QuotesGrid";
import CardGrid from "../components/QuotesGrid/QuotesGrid";
import SectionTitle from "../components/UI/SectionTitle";
import fetchQuotes, { fetchQuoteItemsPerSupplier } from "./actions";

export default async function HomePage() {
  const userQuotes = await fetchQuotes();
  const quoteItemsBySupplier = await fetchQuoteItemsPerSupplier();

  return (
    <div>
      <SectionTitle title="Quote Selection" />
      <QuotesGrid
        quotes={userQuotes}
        allItems={quoteItemsBySupplier}
      ></QuotesGrid>
    </div>
  );
}
