import CardsGrid from "../UI/CardsGrid";
import CardQuotationSkeleton from "./CardQuotationSkeleton";

export default function CardGridSkeletons() {
  return (
    <CardsGrid>
      <CardQuotationSkeleton></CardQuotationSkeleton>
      <CardQuotationSkeleton></CardQuotationSkeleton>
      <CardQuotationSkeleton
        noTag={true}
        noButton={true}
      ></CardQuotationSkeleton>
    </CardsGrid>
  );
}
