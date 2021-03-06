import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TabBar from "../TabBar.js";

it("should render tabs with values", () => {
  const { getByText, getByTestId } = render(<TabBar />);

  const tabs = getByTestId("tabs");
  expect(tabs).toBeInTheDocument();

  const populationTab = getByText(/population/i);
  const climateTab = getByText(/climate/i);
  const economyTab = getByText(/economy/i);
  const colTab = getByText(/cost of living/i);

  expect(populationTab).toBeInTheDocument();
  expect(climateTab).toBeInTheDocument();
  expect(economyTab).toBeInTheDocument();
  expect(colTab).toBeInTheDocument();
});

it("should toggle the 'Mui-selected' class when a different tab is clicked", () => {
  const { getByTestId } = render(<TabBar />);

  const populationTab = getByTestId("population-tab");
  expect(populationTab).toBeInTheDocument();

  const climateTab = getByTestId("climate-tab");
  expect(climateTab).toBeInTheDocument();

  expect([...populationTab.classList]).toContain("Mui-selected");
  expect([...climateTab.classList]).not.toContain("Mui-selected");

  fireEvent.click(climateTab);

  expect([...populationTab.classList]).not.toContain("Mui-selected");
  expect([...climateTab.classList]).toContain("Mui-selected");
});
