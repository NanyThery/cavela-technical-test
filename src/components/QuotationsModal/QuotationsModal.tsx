"use client";

import { Group, Modal, Stack } from "@mantine/core";
import CustomButton from "../UI/CustomButton";
import { QuoteItemsPerSupplier } from "../../app/actions";
import { QuotationCard } from "../../types/QuotationCard.interface";

import QuotationModalItem from "./QuotationModalItem/QuotationModalItem";
import { useState } from "react";
import { QuoteItem } from "../../types/QuoteItem.interface";

interface QuotationsModalProps {
  opened: boolean;
  close: () => void;
  items: QuoteItemsPerSupplier;
  currentQuotes: QuotationCard[];
  onAdd: (args: string[]) => void;
}
export default function QuotationsModal({
  opened,
  close,
  items,
  currentQuotes,
  onAdd,
}: QuotationsModalProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  function checkIfMoreThanOneSupplier(
    selectedItemIds: string[],
    allItems: QuoteItemsPerSupplier
  ) {
    const suppliers: string[] = [];

    Object.keys(allItems).forEach((supplierId) => {
      const itemsFromSupplier = allItems[supplierId].quoteItems.some(
        (item: QuoteItem) => selectedItemIds.includes(item.quoteItemId)
      );

      if (itemsFromSupplier) {
        suppliers.push(supplierId);
      }
    });

    const uniqueSuppliers = new Set(suppliers);

    if (uniqueSuppliers.size > 1) {
      return true;
    }

    return false;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedItemIds = Array.from(
      formData.getAll("quotationItemId") as string[]
    );

    if (selectedItemIds.length === 0) {
      alert("You must select at least one item");
      return;
    }

    if (checkIfMoreThanOneSupplier(selectedItemIds, items)) {
      alert("You can only select items from one supplier");
      return;
    }

    onAdd(selectedItemIds);
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"xl"}
      centered
      title="Create new quote"
    >
      <form onSubmit={handleSubmit}>
        <Stack align="center">
          {Object.keys(items).map((supplierId, index) => {
            const isAlreadyAdded = currentQuotes.some(
              (quote) => quote.supplier.supplierId === supplierId
            );
            return (
              <QuotationModalItem
                item={items[supplierId]}
                disabled={isAlreadyAdded}
                key={index}
              />
            );
          })}
        </Stack>
        <Group display="flex" justify="flex-end" mt="lg">
          <CustomButton type="submit" variant="primary">
            Create
          </CustomButton>
        </Group>
      </form>
    </Modal>
  );
}
