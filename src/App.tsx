import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import AuthenticationPage from "@/pages/auth";
import LandingPage from "@/pages/landing";
// import VehiclesPage from "@/pages/landing/vehicles";
import TracksPage from "./pages/landing/tracks";

/**
 * The main application component that sets up the routing for the application.
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<AuthenticationPage />} path="/auth" />
      <Route element={<LandingPage />} path="/landing" />

      {/* Personal Account */}
      {/* <Route element={<VehiclesPage />} path="/landing/vehicles" /> */}
      <Route element={<TracksPage />} path="/landing/tracks" />

    </Routes>
  );
}

export default App;
