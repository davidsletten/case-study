import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route } from "react-router-dom";

export const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <BrowserRouter>
      <Route path="/:route?/:direction?/:stop?" children={ui} />
    </BrowserRouter>
  );
};

const queryClient = new QueryClient();

export const wrapWithQueryClient = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export const renderWithRouterAndQuery = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Route path="/:route?/:direction?/:stop?" children={ui} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
