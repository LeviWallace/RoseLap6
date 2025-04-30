import { Schema } from "../../../amplify/data/resource";
import TrackCard from "./track-card";

type Track = Schema['Track']['type'];

interface TrackContainerProps {
    tracks: Track[];
    updateCallback: () => void;
}

export default function TrackContainer({ tracks, updateCallback }: TrackContainerProps) {
    return (
		<>
            {tracks.map((track, index) => (
                <TrackCard key={index} track={track} updateCallback={updateCallback} />
            ))}
		</>
    )
}
