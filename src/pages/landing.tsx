import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="flex flex-row h-screen w-full absolute top-0">
                <div className="flex w-1/3 h-screen hover:w-1/2 transition-all duration-500 bg-foreground items-center justify-center">
                <div className="cursor-pointer" onClick={() => navigate('/landing/tracks')}>
                        <h1 className="text-background text-center font-play text-5xl font-bold tracking-tighter">Tracks</h1>
                        <h4 className="text-background text-center font-play text-2xl font-thin tracking-tighter">Enter Tracks</h4>
                    </div>
                </div>
                <div className="flex w-1/3 h-screen hover:w-1/2 transition-all duration-500 bg-background items-center justify-center">
                    <div className="cursor-pointer" onClick={() => navigate('/landing/sweeps')}>
                        <h1 className="text-foreground text-center font-play text-5xl font-bold tracking-tighter">Sweeps</h1>
                        <h4 className="text-foreground text-center font-play text-2xl font-thin tracking-tighter">Enter Sweeps</h4>
                    </div>
                </div>
                <div className="flex w-1/3 h-screen hover:w-1/2 transition-all duration-500 bg-foreground items-center justify-center">
                    <div className="cursor-pointer" onClick={() => navigate('/landing/vehicles')}>
                        <h1 className="text-background text-center font-play text-5xl font-bold tracking-tighter">Vehicles</h1>
                        <h4 className="text-background text-center font-play text-2xl font-thin tracking-tighter">Enter Vehicles</h4>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 w-full">
                <Footer />
            </div>
        </>
    )
}