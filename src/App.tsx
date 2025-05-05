import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { MountProvider } from "@/hooks/use-mount";

import IndexPage from "@/pages/index";
import HistoryPage from "@/pages/history";
import AuthenticationPage from "@/pages/auth";
import LandingPage from "@/pages/landing";

import SimulatePage from "./pages/simulate";
import SimulationPage from "./pages/simulation";

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
		<MountProvider>
			<Routes>
				<Route element={<IndexPage />} path="/" />
				<Route element={<AuthenticationPage />} path="/auth" />
				<Route element={<HistoryPage />} path="/history" />
				{/* Landing Page */}
				<Route element={<ProtectedRoute> <LandingPage /> </ProtectedRoute>} path="/landing" />

				{/* Simulate */}
				<Route element={<ProtectedRoute> <SimulatePage /> </ProtectedRoute>} path="/simulate" />

				{/* Simulation */}
				<Route element={<ProtectedRoute> <SimulationPage id="123" /> </ProtectedRoute>} path="/simulation/:id" />

				{/* Redirect to landing page */}

				{/* Personal Account */}
				<Route element={<TracksPage />} path="/landing/tracks" />
				<Route element={<ComponentsPage />} path="/landing/components" />
				<Route element={<VehiclesPage />} path="/landing/vehicles" />
				<Route element={<SweepsPage />} path="/landing/sweeps" />
			</Routes>
		</MountProvider>
	);
}

export default App;
