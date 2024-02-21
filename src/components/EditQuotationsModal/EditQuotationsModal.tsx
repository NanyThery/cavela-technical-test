"use client";

import { Group, Modal, Stack } from "@mantine/core";
import CustomButton from "../UI/CustomButton";
import { QuoteItemsPerSupplier } from "../../app/actions";
import { QuotationCard } from "../../types/QuotationCard.interface";

import QuotationModalItem from "@/components/QuotationsModal/QuotationModalItem/QuotationModalItem";
import { useState } from "react";
import { QuoteItem } from "../../types/QuoteItem.interface";

interface EditQuotationModalProps {
  opened: boolean;
  close: () => void;
  items: QuoteItemsPerSupplier;
  currentQuotes: QuotationCard[];
  onApply: (args: string[]) => void;
}
export default function EditQuotationModal({
  opened,
  close,
  items,
  currentQuotes,
  onApply,
}: EditQuotationModalProps) {
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

    onApply(selectedItemIds);
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"xl"}
      centered
      title="Edit Quotation"
    >
      <form onSubmit={handleSubmit}>
        <Stack align="center">
          {Object.keys(items).map((supplierId, index) => {
            return (
              <QuotationModalItem
                item={items[supplierId]}
                currentQuotes={currentQuotes}
                isSupplierAdded={false}
                key={index}
              />
            );
          })}
        </Stack>
        <Group display="flex" justify="flex-end" mt="lg">
          <CustomButton type="submit" variant="primary">
            Apply
          </CustomButton>
        </Group>
      </form>
    </Modal>
  );
}
