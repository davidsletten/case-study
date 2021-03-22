import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "../components/app";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/:route?/:direction?/:stop?" children={<App />} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
