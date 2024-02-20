import CardGrid from "../CardGrid/CardGrid";
import CardQuotationSkeleton from "./CardQuotationSkeleton";

export default function CardGridSkeletons() {
  return (
    <CardGrid>
      <CardQuotationSkeleton></CardQuotationSkeleton>
      <CardQuotationSkeleton></CardQuotationSkeleton>
      <CardQuotationSkeleton noTag={true}></CardQuotationSkeleton>
    </CardGrid>
  );
}
