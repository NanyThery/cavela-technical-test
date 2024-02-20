import { ColorVariant } from "../types/ColorVariant.type";

export function selectTagVariant(index: number): ColorVariant {
  const variants: ColorVariant[] = [
    "primary",
    "orange",
    "secondary",
    "tertiary",
  ];
  const variantIndex = index % variants.length;
  const variant = variants[variantIndex];
  return variant;
}
