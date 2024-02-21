"use server";

import quoteItems from "@/data/quote_items.json";
import quotes from "@/data/quotes.json";
import suppliers from "@/data/suppliers.json";
import { Badge } from "../types/Badge.type";
import { QuoteItem } from "../types/QuoteItem.interface";
import { Supplier } from "../types/Supplier.interface";
import { QuotationCard } from "../types/QuotationCard.interface";
import { moneyStringToNumber } from "../utils/moneyConversor";

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
    unitCost: moneyStringToNumber(item.unit_cost),
    leadTime: item.lead_time,
    sampleCost: item.sample_cost,
    badges: item.badges as Badge[],
  }));

  return Promise.resolve(mappedItems);
}

function fetchAllQuoteItems(): Promise<QuoteItem[]> {
  const mappedItems = quoteItems.map((item) => ({
    supplierId: item.supplier_id,
    quoteItemId: item.quote_item_id,
    variant: item.variant,
    moq: item.moq,
    quantity: item.quantity,
    unitCost: moneyStringToNumber(item.unit_cost),
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

function fetchAllSuppliersInfo(): Promise<Supplier[]> {
  const mappedSuppliers = suppliers.map((supplier) => ({
    supplierId: supplier?.supplier_id || "",
    name: supplier?.name || "",
    score: supplier?.score || 0,
  }));

  return Promise.resolve(mappedSuppliers);
}

//These are the quotes created automatically or manually stored in the user' account.

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

export interface QuoteItemsPerSupplier {
  [supplierId: string]: {
    supplier: Supplier;
    quoteItems: QuoteItem[];
  };
}

// We are simulating the fetching of the quote items per supplier. This is a common operation when we want to display the quote items per supplier in a table, for example.

export async function fetchQuoteItemsPerSupplier(): Promise<QuoteItemsPerSupplier> {
  // We will assume that the endpoint returns the quote items and the suppliers for this operation only.
  const allQuoteItems = await fetchAllQuoteItems();
  const allSuppliers = await fetchAllSuppliersInfo();

  const quoteItemsPerSupplier: QuoteItemsPerSupplier = {};

  allQuoteItems.forEach((quoteItem) => {
    const supplierId = quoteItem.supplierId;
    const supplier = allSuppliers.find((s) => s.supplierId === supplierId);

    if (supplier) {
      if (!quoteItemsPerSupplier[supplierId]) {
        quoteItemsPerSupplier[supplierId] = {
          supplier,
          quoteItems: [],
        };
      }

      quoteItemsPerSupplier[supplierId].quoteItems.push(quoteItem);
    }
  });

  return Promise.resolve(quoteItemsPerSupplier);
}
