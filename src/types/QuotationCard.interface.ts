import { Badge } from "@/types/Badge.type";
import { QuoteItem } from "./QuoteItem.interface";
import { Supplier } from "./Supplier.interface";

export interface QuotationCard {
  supplier: Supplier;
  quoteItems: QuoteItem[];
  badges: Badge[];
  isCavelaChoice: boolean;
}
