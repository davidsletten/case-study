import React from "react";
import axios from "axios";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import "./app.css";

const queryClient = new QueryClient();

function App() {
  const [selectedRoute, setSelectedRoute] = React.useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <h1>NexTrip Case Study</h1>
        <h2>by David Sletten</h2>
      </header>
      <main>
        <h3>Real-time Departures</h3>
        <Route
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
      </main>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

function useRoutes() {
  return useQuery("routes", async () => {
    const { data } = await axios.get(
      "https://svc.metrotransit.org/NexTrip/Routes"
    );
    return data;
  });
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

function Route({ selectedRoute, setSelectedRoute }) {
  const classes = useStyles();
  const { status, data, error } = useRoutes();

  const handleChange = (event) => {
    setSelectedRoute(event.target.value);
  };

  return (
    <div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="route-select-label">Select route</InputLabel>
          <Select
            labelId="route-select-label"
            id="route-select"
            label="Select route"
            value={selectedRoute}
            onChange={handleChange}
          >
            {data.map((route) => (
              <MenuItem key={route.Route} value={route.Route}>
                {route.Description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default App;
