import React, { useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { MenuItem } from "@material-ui/core";
import "../styles/app.css";
import Dropdown from "./dropdown";
import Departures from "./departures";

const queryClient = new QueryClient();

function useRoutes() {
  return useQuery("routes", async () => {
    const { data } = await axios.get(
      "https://svc.metrotransit.org/NexTrip/Routes"
    );
    return data;
  });
}

function useDirections(parent) {
  return useQuery("directions", async () => {
    const { data } = await axios.get(
      `https://svc.metrotransit.org/NexTrip/Directions/${parent}`
    );
    return data;
  });
}

function useStops(parent) {
  return useQuery("stops", async () => {
    const { data } = await axios.get(
      `https://svc.metrotransit.org/NexTrip/Stops/${parent}`
    );
    return data;
  });
}

function useDepartures(route, direction, stop) {
  return useQuery("departures", async () => {
    const { data } = await axios.get(
      `https://svc.metrotransit.org/NexTrip/${route}/${direction}/${stop}`
    );
    return data;
  });
}

function App() {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedStop, setSelectedStop] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <h1>NexTrip Case Study</h1>
        <h2>by David Sletten</h2>
      </header>
      <main>
        <h3>Real-time Departures</h3>
        <Dropdown
          name="route"
          label="Select route"
          menuItem={(item) => (
            <MenuItem key={item.Route} value={item.Route}>
              {item.Description}
            </MenuItem>
          )}
          selection={selectedRoute}
          setSelection={setSelectedRoute}
          fetchData={useRoutes}
        />
        {!!selectedRoute && (
          <Dropdown
            name="direction"
            label="Select direction"
            menuItem={(item) => (
              <MenuItem key={item.Value} value={item.Value}>
                {item.Text}
              </MenuItem>
            )}
            selection={selectedDirection}
            setSelection={setSelectedDirection}
            fetchData={useDirections}
            fetchParams={selectedRoute}
          />
        )}
        {!!selectedDirection && (
          <Dropdown
            name="stop"
            label="Select stop"
            menuItem={(item) => (
              <MenuItem key={item.Value} value={item.Value}>
                {item.Text}
              </MenuItem>
            )}
            selection={selectedStop}
            setSelection={setSelectedStop}
            fetchData={useStops}
            fetchParams={`${selectedRoute}/${selectedDirection}`}
          />
        )}
        {!!selectedStop && (
          <Departures
            route={selectedRoute}
            direction={selectedDirection}
            stop={selectedStop}
            fetchData={useDepartures}
          />
        )}
      </main>
    </QueryClientProvider>
  );
}

export default App;
