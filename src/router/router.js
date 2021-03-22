import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../components/app";

function AppRouter() {
  return (
    <Router>
      <Route path="/:route?/:direction?/:stop?" children={<App />} />
    </Router>
  );
}

export default AppRouter;
