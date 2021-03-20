import { useQueryClient } from "react-query";
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

function Departures({ route, direction, stop, fetchData }) {
  const { status, data, error } = fetchData(route, direction, stop);
  const classes = useStyles();
  const queryClient = useQueryClient();
  const routeDescription = queryClient.getQueryData("routes")
    ? queryClient.getQueryData("routes").find((item) => item.Route === route)
        .Description
    : route;

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
  route: PropTypes.string,
  direction: PropTypes.string,
  stop: PropTypes.string,
  fetchData: PropTypes.func,
};

export default Departures;
