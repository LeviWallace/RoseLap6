import { Schema } from "../../../amplify/data/resource";
import TrackCard from "./track-card";

type Track = Schema['Track']['type'];

interface TrackContainerProps {
    tracks: Track[];
    updateCallback: () => void;
}

export default function TrackContainer({ tracks, updateCallback }: TrackContainerProps) {
    return (
        <div className="grid grid-cols-3 justify-between m-2 p-2">
            {tracks.map((track, index) => (
                <TrackCard key={index} track={track} updateCallback={updateCallback} />
            ))}
        </div>
    )
}