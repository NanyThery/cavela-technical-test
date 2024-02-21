import { Badge } from "./Badge.type";

export interface QuoteItem {
  supplierId: string;
  quoteItemId: string;
  variant: string;
  moq: number;
  quantity: number;
  unitCost: number;
  leadTime: string;
  sampleCost: string;
  badges: Badge[];
  isCavelasChoice: boolean;
}
