import { screen } from "@testing-library/react";
import { renderWithRouter } from "../testing/testUtils";
import App from "./app";

test("renders header", () => {
  renderWithRouter(<App />);
  const headerText = screen.getByText(/NexTrip Case Study/i);
  expect(headerText).toBeInTheDocument();
});

test("renders route dropdown", async () => {
  renderWithRouter(<App />);
  const routeDropdownText = await screen.findByLabelText(/Select route/i);
  expect(routeDropdownText).toBeInTheDocument();
});

test("renders direction dropdown when URL contains route param", async () => {
  renderWithRouter(<App />, { route: "/901" });
  const directionDropdownText = await screen.findByLabelText(
    /Select direction/i
  );
  expect(directionDropdownText).toBeInTheDocument();
});

test("renders stop dropdown when URL contains route and direction params", async () => {
  renderWithRouter(<App />, { route: "/901/0" });
  const stopDropdownText = await screen.findByLabelText(/Select stop/i);
  expect(stopDropdownText).toBeInTheDocument();
});

test("renders departure table when URL contains route, direction, and stop params", async () => {
  renderWithRouter(<App />, { route: "/901/0/MAAM" });
  const departureTableText = await screen.findByText(/Destination/i);
  expect(departureTableText).toBeInTheDocument();
});
