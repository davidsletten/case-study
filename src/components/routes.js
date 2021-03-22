import axios from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import Dropdown from "./dropdown";

function useRoutes() {
  return useQuery("routes", async () => {
    const { data } = await axios.get(
      "https://svc.metrotransit.org/NexTrip/Routes"
    );
    return data;
  });
}

function Routes({ selection }) {
  const history = useHistory();

  return (
    <Dropdown
      name="route"
      label="Select route"
      menuItem={(item) => (
        <MenuItem key={item.Route} value={item.Route}>
          {item.Description}
        </MenuItem>
      )}
      selection={selection}
      setSelection={(route) => history.push(`/${route}`)}
      optionData={useRoutes()}
    />
  );
}

Routes.propTypes = {
  selection: PropTypes.string.isRequired,
};

export default Routes;
