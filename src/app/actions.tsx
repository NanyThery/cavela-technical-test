"use server";

import quoteItems from "@/data/quote_items.json";
import quotes from "@/data/quotes.json";
import suppliers from "@/data/suppliers.json";
import { Badge } from "../types/Badge.type";
import { QuoteItem } from "../types/QuoteItem.interface";
import { Supplier } from "../types/Supplier.interface";
import { QuotationCard } from "../types/QuotationCard.interface";

function fetchQuoteItems(itemsId: string[]): Promise<QuoteItem[]> {
  const filteredItems = quoteItems.filter((item) =>
    itemsId.includes(item.quote_item_id)
  );

  const mappedItems = filteredItems.map((item) => ({
    supplierId: item.supplier_id,
    quoteItemId: item.quote_item_id,
    variant: item.variant,
    moq: item.moq,
    quantity: item.quantity,
    unitCost: item.unit_cost,
    leadTime: item.lead_time,
    sampleCost: item.sample_cost,
    badges: item.badges as Badge[],
  }));

  return Promise.resolve(mappedItems);
}

function fetchSupplierInfo(supplierId: string): Promise<Supplier> {
  const supplier = suppliers.find(
    (rawSupplier) => rawSupplier.supplier_id === supplierId
  );

  const mappedSupplier = {
    supplierId: supplier?.supplier_id || "",
    name: supplier?.name || "",
    score: supplier?.score || 0,
  };

  return Promise.resolve(mappedSupplier);
}

export default async function fetchQuotes(): Promise<QuotationCard[]> {
  const mappedQuotes = await Promise.all(
    quotes.map(async (quote) => {
      const mappedQuoteItems = await fetchQuoteItems(quote.quote_items);
      const supplier = await fetchSupplierInfo(mappedQuoteItems[0]?.supplierId);
      const isCavelaChoice = mappedQuoteItems.some((item) =>
        item.badges.some(
          (badge) => badge[0] === "cavela_choice" && badge[1] === true
        )
      );

      return {
        supplier,
        quoteItems: mappedQuoteItems,
        badges: quote.badges as Badge[],
        isCavelaChoice,
      };
    })
  );

  // Manually delayed to simulate a real-world scenario
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mappedQuotes);
    }, 3000);
  });
}
