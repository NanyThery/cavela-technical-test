import CardGridSkeletons from "../components/Skeletons/CardGridSkeletons";
import SectionTitle from "../components/UI/SectionTitle";

export default function LoadingQuotationPage() {
  return (
    <div>
      <SectionTitle title="Quote Selection" />
      <CardGridSkeletons />
    </div>
  );
}
