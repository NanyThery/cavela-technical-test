import CardGrid from "../components/CardGrid/CardGrid";
import SectionTitle from "../components/UI/SectionTitle";
import fetchQuotes from "./actions";
import CardQuote from "@/components/CardQuote/CardQuote";

export default async function HomePage() {
  const quotes = await fetchQuotes();
  return (
    <div>
      <SectionTitle title="Quote Selection" />
      <CardGrid>
        {quotes.map((q, index) => (
          <CardQuote key={index} quote={q} />
        ))}
      </CardGrid>
    </div>
  );
}
