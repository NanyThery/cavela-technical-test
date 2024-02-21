import CardGrid from "../components/CardGrid/CardGrid";
import SectionTitle from "../components/UI/SectionTitle";
import fetchQuotes from "./actions";

export default async function HomePage() {
  const userQuotes = await fetchQuotes();

  return (
    <div>
      <SectionTitle title="Quote Selection" />
      <CardGrid quotes={userQuotes}></CardGrid>
    </div>
  );
}
