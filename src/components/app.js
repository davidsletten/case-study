import React from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/app.css";
import Dropdown from "./dropdown";

const queryClient = new QueryClient();

function useRoutes() {
  return useQuery("routes", async () => {
    const { data } = await axios.get(
      "https://svc.metrotransit.org/NexTrip/Routes"
    );
    return data;
  });
}

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
        <Dropdown
          name="route"
          label="Select route"
          selection={selectedRoute}
          setSelection={setSelectedRoute}
          fetchData={useRoutes}
        />
      </main>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
