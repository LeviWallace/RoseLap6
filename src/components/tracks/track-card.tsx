import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";

type Track = Schema['Track']['type'];

interface TrackProps {
    track: Track;
    updateCallback: () => void;
}

const client = generateClient<Schema>();

/**
 * TrackCard component renders a card displaying track information and provides options to delete, mount, or view the track.
 *
 * @component
 * @param {TrackProps} props - The properties object.
 * @returns {JSX.Element} The TrackCard component.
 */
export default function TrackCard({track, updateCallback}: TrackProps) {

    async function handleDeleteTrack() {
        const { errors, data } = await client.models.Track.delete({ id: track.id });
        console.log(errors, data);
        updateCallback();
    }

    return (
        <Card className="border rounded-none m-2 bg-background">
            <CardHeader className="justify-between">
                <h1 className="text-2xl font-extrabold">{track.name}</h1>
            </CardHeader>
            <CardBody className="flex-row justify-between">
                <h2 className="text-md italic">{track.country}</h2>
                <h2 className="text-md italic">{track.state}</h2>
                <h2 className="text-md italic">{track.city}</h2>
            </CardBody>
            <CardFooter className="justify-between">
                <Button color="danger" size="sm" onPress={handleDeleteTrack}>
                    Delete Track
                </Button>
                <Button color="secondary" size="sm">
                    Mount Track
                </Button>
                <Button color="primary" size="sm">
                    View Track
                </Button>
            </CardFooter>
        </Card>
    )
}