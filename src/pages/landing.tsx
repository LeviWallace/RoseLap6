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
                <div className="flex w-1/3 h-screen hover:w-1/2 transition-all duration-500 bg-background items-center justify-center relative overflow-hidden">
                    <video className="h-full w-full object-cover absolute top-0 left-0 opacity-20 hover:opacity-50 transition-opacity" src={tracks} loop muted autoPlay></video>
                    <div className="cursor-pointer relative z-10" onClick={() => navigate('/landing/tracks')}>
                        <h1 className="text-foreground  text-center font-play text-5xl font-bold tracking-tighter">Tracks</h1>
                        <h4 className="text-foreground text-center font-play text-2xl font-thin tracking-tighter">Enter Tracks</h4>
                    </div>
                </div>
                <div className="flex w-1/3 h-screen hover:w-1/2 transition-all duration-500  bg-background items-center justify-center relative overflow-hidden">
                    <video className="h-full w-full object-cover absolute top-0 left-0 opacity-20 hover:opacity-50 transition-opacity" src={sweeps} loop muted autoPlay></video>
                    <div className="cursor-pointer relative z-10" onClick={() => navigate('/landing/sweeps')}>
                        <h1 className="text-foreground text-center font-play text-5xl font-bold tracking-tighter">Sweeps</h1>
                        <h4 className="text-foreground text-center font-play text-2xl font-thin tracking-tighter">Enter Sweeps</h4>
                    </div>
                </div>
                <div className="flex w-1/3 h-screen hover:w-1/2 transition-all duration-50 items-center justify-center relative overflow-hidden">
                    <video className="h-full w-full object-cover absolute top-0 left-0" src={vehicles} loop muted autoPlay></video>
                    <div className="flex flex-col w-full h-full">
                        <div className="flex h-1/2 hover:h-full w-full transition-all duration-200 relative">
                            <div className="h-full w-full bg-background opacity-80 hover:opacity-20 border-b-1 z-10 border-black absolute transition-opacity duration-500"></div>
                            <div className="flex h-full w-full items-center justify-center absolute">
                                <div className="cursor-pointer relative z-10" onClick={() => navigate('/landing/vehicles')}>
                                    <h1 className="text-foreground text-center font-play text-5xl font-bold tracking-tighter">Vehicles</h1>
                                    <h4 className="text-foreground text-center font-play text-2xl font-thin tracking-tighter">Enter Vehicles</h4>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-1/2 hover:h-full w-full transition-all duration-200 relative">
                            <div className="h-full w-full bg-background opacity-80 hover:opacity-20 border-b-1 z-10 border-black absolute transition-opacity duration-500"></div>
                            <div className="flex h-full w-full items-center justify-center absolute">
                                <div className="cursor-pointer relative z-10" onClick={() => navigate('/landing/components')}>
                                    <h1 className="text-foreground text-center font-play text-5xl font-bold tracking-tighter">Vehicle Components</h1>
                                    <h4 className="text-foreground text-center font-play text-2xl font-thin tracking-tighter">Enter Vehicle Components</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 w-full">
                <Footer />
            </div>
        </>
    )
}