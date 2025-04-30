import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { useMount } from "@/hooks/use-mount";

type Track = Schema['Track']['type'];

interface TrackProps {
	track: Track;
	updateCallback?: () => void;
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
	const { mountTrack } = useMount();

	async function handleDeleteTrack() {
		const { errors, data } = await client.models.Track.delete({ id: track.id });
		console.log(errors, data);
		if (updateCallback) updateCallback();
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
				{ updateCallback &&
					<Button color="danger" size="sm" onPress={handleDeleteTrack}>
						Delete
					</Button>
				}
				<Button color="primary" size="sm" onPress={() => { mountTrack(track); }}>
					Mount
				</Button>
			</CardFooter>
		</Card>
	)
}
