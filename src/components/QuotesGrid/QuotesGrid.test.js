import { render, screen } from "../../test-utils";
import QuotesGrid from "./QuotesGrid.tsx";

describe("QuotesGrid", () => {
  it("should render 3 AddQuotationButton components when quotes array has 0 items", () => {
    const quotes = [];
    render(<QuotesGrid quotes={quotes} allItems={[]} />);
    const addQuotationButtons = screen.getAllByTestId("add-quotation-button");
    expect(addQuotationButtons.length).toBe(3);
  });
});
