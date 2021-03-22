import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useParams } from "react-router-dom";
import "../styles/app.css";
import Routes from "./routes";
import Directions from "./directions";
import Stops from "./stops";
import Departures from "./departures";

const queryClient = new QueryClient();

function App() {
  const { route, direction, stop } = useParams();
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedStop, setSelectedStop] = useState("");

  useEffect(() => {
    const validRoute = route >= 0;
    const validDirection = direction >= 0;
    const validStop = !!stop;

    if (!validRoute && !validDirection && !validStop) {
      setSelectedRoute("");
      setSelectedDirection("");
      setSelectedStop("");
    }
    if (validRoute) {
      setSelectedStop("");
      setSelectedDirection("");
      setSelectedRoute(route);
    }
    if (validDirection) {
      setSelectedStop("");
      setSelectedDirection(direction);
    }
    if (validStop) {
      setSelectedStop(stop);
    }
  }, [route, direction, stop]);

  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <h1>NexTrip Case Study</h1>
        <h2>by David Sletten</h2>
      </header>
      <main>
        <h3>Real-time Departures</h3>
        <Routes selection={selectedRoute} />
        {!!selectedRoute && (
          <Directions
            selection={selectedDirection}
            selectedRoute={selectedRoute}
          />
        )}
        {!!selectedDirection && (
          <Stops
            selection={selectedStop}
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
