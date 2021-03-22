import { render } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

export const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <BrowserRouter>
      <Route path="/:route?/:direction?/:stop?" children={ui} />
    </BrowserRouter>
  );
};
