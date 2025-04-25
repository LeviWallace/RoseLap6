import { Schema } from "../../amplify/data/resource";
import { useState } from "react";


type Vehicle = Schema['Vehicle']['type'];
type Track = Schema['Track']['type']; 

export function useMount() {
	const [vehicle, setVehicle] = useState<Vehicle>();
	const [track, setTrack] = useState<Track>();
	
	function mountVehicle(vehicle: Vehicle) {
		setVehicle(vehicle);
	}

	function mountTrack(track: Track) {
		setTrack(track);
	}

	return [vehicle, track, mountTrack, mountVehicle];
}
