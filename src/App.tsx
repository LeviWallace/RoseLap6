import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

import IndexPage from "@/pages/index";
import AuthenticationPage from "@/pages/auth";
import LandingPage from "@/pages/landing";
// import VehiclesPage from "@/pages/landing/vehicles";
import TracksPage from "./pages/landing/tracks";
import ComponentsPage from "./pages/landing/components";
import VehiclesPage from "./pages/landing/vehicles";
import SweepsPage from "./pages/landing/sweeps";
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await fetchAuthSession();
      if (result.tokens)
        setAuthenticated(true);
      else {
        setAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);
  
  if (isLoading) return null;
  return authenticated ? <>{children}</> : <Navigate to="/auth" />;
};
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

      {/* Landing Page */}
      <Route  element={<ProtectedRoute> <LandingPage /> </ProtectedRoute>} path="/landing" />

      {/* Personal Account */}
      <Route element={<TracksPage />} path="/landing/tracks" />
      <Route element={<ComponentsPage />} path="/landing/components" />
      <Route element={<VehiclesPage />} path="/landing/vehicles" />
      <Route element={<SweepsPage />} path="/landing/sweeps" />
    </Routes>
  );
}

export default App;
