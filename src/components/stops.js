import axios from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import Dropdown from "./dropdown";

function useStops(selectedRoute, selectedDirection) {
  return useQuery("stops", async () => {
    const { data } = await axios.get(
      `https://svc.metrotransit.org/NexTrip/Stops/${selectedRoute}/${selectedDirection}`
    );
    return data;
  });
}

function Stops({ selection, selectedRoute, selectedDirection }) {
  const history = useHistory();

  return (
    <Dropdown
      name="stop"
      label="Select stop"
      menuItem={(item) => (
        <MenuItem key={item.Value} value={item.Value}>
          {item.Text}
        </MenuItem>
      )}
      selection={selection}
      setSelection={(stop) =>
        history.push(`/${selectedRoute}/${selectedDirection}/${stop}`)
      }
      optionData={useStops(selectedRoute, selectedDirection)}
    />
  );
}

Stops.propTypes = {
  selection: PropTypes.string.isRequired,
  selectedRoute: PropTypes.string.isRequired,
  selectedDirection: PropTypes.string.isRequired,
};

export default Stops;
