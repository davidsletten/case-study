import { fireEvent, screen, within } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import {
  renderWithRouterAndQuery,
  wrapWithQueryClient,
} from "../testing/testUtils";
import Routes, { useRoutes } from "./routes";
import routesFixture from "../testing/routesFixture.json";

const defaultProps = {
  selection: "",
};

test("renders route dropdown", async () => {
  renderWithRouterAndQuery(<Routes {...defaultProps} />);
  const routeDropdownText = await screen.findByLabelText(/Select route/i);
  expect(routeDropdownText).toBeInTheDocument();
});

test("fetches options", async () => {
  const { result, waitFor } = renderHook(() => useRoutes(), {
    wrapper: wrapWithQueryClient,
  });
  await waitFor(() => result.current.isSuccess);
  expect(result.current.data).toEqual(routesFixture);
});

test("pushes to history on selection", async () => {
  const { getByRole } = renderWithRouterAndQuery(<Routes {...defaultProps} />);
  fireEvent.mouseDown(getByRole("button"));
  const listbox = within(getByRole("listbox"));
  fireEvent.click(listbox.getByText(/METRO Blue Line/i));
  expect(window.location.pathname).toBe("/901");
});
