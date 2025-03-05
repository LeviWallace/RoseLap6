import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useNavigate } from "react-router-dom";

import tracks from "../assets/landing/tracks.mp4";
import sweeps from "../assets/landing/sweeps.mp4";
import vehicles from "../assets/landing/vehicles.mp4";

/**
 * LandingPage component renders the landing page with three sections: Tracks, Sweeps, and Vehicles.
 * Each section expands on hover and navigates to a different route when clicked.
 *
 * @component
 * @example
 * return (
 *   <LandingPage />
 * )
 *
 * @returns {JSX.Element} The rendered landing page component.
 */
export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="flex flex-row h-screen w-full absolute top-0">
                {[
                    { src: tracks, route: '/landing/tracks', title: 'Tracks', subtitle: 'Enter Tracks'},
                    { src: sweeps, route: '/landing/sweeps', title: 'Sweeps', subtitle: 'Enter Sweeps'},
                    { src: vehicles, route: '/landing/vehicles', title: 'Vehicles', subtitle: 'Enter Vehicles'}
                ].map((item, index) => (
                    <div key={index} className="flex w-1/3 h-screen hover:w-1/2 transition-all duration-500 bg-background items-center justify-center relative overflow-hidden">
                        <video className="h-full w-full object-cover absolute top-0 left-0 opacity-20 hover:opacity-80 transition-opacity duration-300" src={item.src} loop muted autoPlay></video>
                        <div className="cursor-pointer relative z-10" onClick={() => navigate(item.route)}>
                            <h1 className={`text-center font-play text-5xl font-bold tracking-tighter`}>{item.title}</h1>
                            <h4 className={`text-center font-play text-2xl font-thin tracking-tighter`}>{item.subtitle}</h4>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 w-full">
                <Footer />
            </div>
        </>
    )
}