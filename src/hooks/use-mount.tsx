import { Schema } from "../../amplify/data/resource";
import { createContext, useContext, useState, ReactNode } from "react";

type Vehicle = Schema['Vehicle']['type'];
type Track = Schema['Track']['type'];

type MountContextType = {
    vehicle?: Vehicle,
    track?: Track,
    mountVehicle: (vehicle: Vehicle) => void,
    mountTrack: (track: Track) => void,
	unmountVehicle: () => void,
	unmountTrack: () => void,
}

const MountContext = createContext<MountContextType | undefined>(undefined);

export function MountProvider({ children }: { children: ReactNode }) {
	const [vehicle, setVehicle] = useState<Vehicle | undefined>(() => {
		const vehicle = localStorage.getItem("vehicle");
		return vehicle ? JSON.parse(vehicle) : undefined;
	});
	
	const [track, setTrack] = useState<Track | undefined>(() => {
		const track = localStorage.getItem("track");
		return track ? JSON.parse(track) : undefined;
	});

    function mountVehicle(v: Vehicle) {
		setVehicle(v);
		localStorage.setItem("vehicle", JSON.stringify(vehicle));
    }

    function mountTrack(t: Track) {
		setTrack(t);
		localStorage.setItem("track", JSON.stringify(track));
    }

	function unmountVehicle() {
		setVehicle(undefined);
		localStorage.removeItem("vehicle");
	}

	function unmountTrack() {
		setTrack(undefined);
		localStorage.removeItem("track");
	}

    return (
		<MountContext.Provider value={{ vehicle, track, mountVehicle, mountTrack, unmountVehicle, unmountTrack }}>
            {children}
        </MountContext.Provider>
    );
}

export function useMount(): MountContextType {
    const context = useContext(MountContext);
    if (!context) {
        throw new Error("useMount must be used within a MountProvider");
    }
    return context;
}
