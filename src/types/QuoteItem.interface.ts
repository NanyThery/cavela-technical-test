import { Badge } from './Badge.type';

export interface QuoteItem {
  supplierId: string;
  quoteItemId: string;
  variant: string;
  moq: number;
  quantity: number;
  unitCost: string;
  leadTime: string;
  sampleCost: string;
  badges: Badge[];
}
