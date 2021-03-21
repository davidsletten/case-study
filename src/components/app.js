import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/app.css";
import Routes from "./routes";
import Directions from "./directions";
import Stops from "./stops";
import Departures from "./departures";

const queryClient = new QueryClient();

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
        <Routes selection={selectedRoute} setSelection={setSelectedRoute} />
        {!!selectedRoute && (
          <Directions
            selection={selectedDirection}
            setSelection={setSelectedDirection}
            selectedRoute={selectedRoute}
          />
        )}
        {!!selectedDirection && (
          <Stops
            selection={selectedStop}
            setSelection={setSelectedStop}
            selectedRoute={selectedRoute}
            selectedDirection={selectedDirection}
          />
        )}
        {!!selectedStop && (
          <Departures
            selectedRoute={selectedRoute}
            selectedDirection={selectedDirection}
            selectedStop={selectedStop}
          />
        )}
      </main>
    </QueryClientProvider>
  );
}

export default App;
