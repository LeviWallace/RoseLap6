import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import LandingPage from "@/pages/landing";
// import VehiclesPage from "@/pages/landing/vehicles";
import TracksPage from "./pages/landing/tracks";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<LandingPage />} path="/landing" />

      {/* Personal Account */}
      {/* <Route element={<VehiclesPage />} path="/landing/vehicles" /> */}
      <Route element={<TracksPage />} path="/landing/tracks" />

    </Routes>
  );
}

export default App;
