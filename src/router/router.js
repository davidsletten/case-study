import { BrowserRouter, Route } from "react-router-dom";
import App from "../components/app";

function Router() {
  return (
    <BrowserRouter>
      <Route path="/:route?/:direction?/:stop?" children={<App />} />
    </BrowserRouter>
  );
}

export default Router;
