import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    margin: "auto",
    maxWidth: 700,
  },
});

function useDepartures(selectedRoute, selectedDirection, selectedStop) {
  return useQuery("departures", async () => {
    const { data } = await axios.get(
      `https://svc.metrotransit.org/NexTrip/${selectedRoute}/${selectedDirection}/${selectedStop}`
    );
    return data;
  });
}

function Departures({ selectedRoute, selectedDirection, selectedStop }) {
  const { status, data, error } = useDepartures(
    selectedRoute,
    selectedDirection,
    selectedStop
  );
  const classes = useStyles();
  const queryClient = useQueryClient();
  const routeDescription = queryClient.getQueryData("routes")
    ? queryClient
        .getQueryData("routes")
        .find((item) => item.Route === selectedRoute).Description
    : selectedRoute;

  return (
    <div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <TableContainer className={classes.root} component={Paper}>
          <Table aria-label="Departures">
            <TableHead>
              <TableRow>
                <StyledTableCell>Route</StyledTableCell>
                <StyledTableCell>Destination</StyledTableCell>
                <StyledTableCell align="right">Departs</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((departure) => (
                <TableRow key={departure.DepartureTime}>
                  <TableCell>{routeDescription}</TableCell>
                  <TableCell>{departure.Description}</TableCell>
                  <TableCell align="right">{departure.DepartureText}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

Departures.propTypes = {
  selectedRoute: PropTypes.string,
  selectedDirection: PropTypes.string,
  selectedStop: PropTypes.string,
};

export default Departures;
