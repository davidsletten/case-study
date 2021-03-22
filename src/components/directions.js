import axios from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import Dropdown from "./dropdown";

function useDirections(selectedRoute) {
  return useQuery("directions", async () => {
    const { data } = await axios.get(
      `https://svc.metrotransit.org/NexTrip/Directions/${selectedRoute}`
    );
    return data;
  });
}

function Directions({ selection, selectedRoute }) {
  const history = useHistory();

  return (
    <Dropdown
      name="direction"
      label="Select direction"
      menuItem={(item) => (
        <MenuItem key={item.Value} value={item.Value}>
          {item.Text}
        </MenuItem>
      )}
      selection={selection}
      setSelection={(direction) =>
        history.push(`/${selectedRoute}/${direction}`)
      }
      optionData={useDirections(selectedRoute)}
    />
  );
}

Directions.propTypes = {
  selection: PropTypes.string.isRequired,
  selectedRoute: PropTypes.string.isRequired,
};

export default Directions;
