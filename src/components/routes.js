import axios from "axios";
import { useQuery } from "react-query";
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

function Routes({ selection, setSelection }) {
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
      setSelection={setSelection}
      optionData={useRoutes()}
    />
  );
}

Routes.propTypes = {
  selection: PropTypes.string.isRequired,
  setSelection: PropTypes.func.isRequired,
};

export default Routes;
