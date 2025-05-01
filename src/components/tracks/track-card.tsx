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
	const { track: t, mountTrack, unmountTrack } = useMount();

	async function handleDeleteTrack() {
		const { errors, data } = await client.models.Track.delete({ id: track.id });
		console.log(errors, data);
		if (updateCallback) {
			if (t?.id === track.id) {
				unmountTrack();
			}
			updateCallback();
		}
	}

	return (
		<Card className="border rounded-xl m-2 bg-background min-w-[450px] w-[450px] min-h-[200px] h-[200px]">
			<CardHeader className="justify-between">
				<h1 className="text-2xl font-extrabold">{track.name}</h1>
			</CardHeader>
			<CardBody className="flex flex-row w-full justify-evenly gap-2 pt-0">
				<div className="flex flex-col text-center">
					<h1 className="text-2xl font-bold tracking-tighter">Country</h1>
					<p className="font-thin">{track.country}</p>
				</div>
				<div className="flex flex-col text-center">
					<h1 className="text-2xl font-bold tracking-tigher">State</h1>
					<p className="font-thin">{track.state}</p>
				</div>
				<div className="flex flex-col text-center">
					<h1 className="text-2xl font-bold tracking-tigher">Track City</h1>
					<p className="text-md font-thin">{track.city}</p>
				</div>
			</CardBody>
			<CardFooter className="justify-between">
				{ updateCallback &&
					<Button color="primary" size="sm" onPress={handleDeleteTrack}>
						Delete
					</Button>
				}
				{ track.id === t?.id ?
					<Button color="secondary" size="sm" onPress={() => { unmountTrack(); }}>
						Dismount
					</Button>
					:
					<Button color="secondary" size="sm" onPress={() => { mountTrack(track); }}>
						Mount
					</Button>
				}

			</CardFooter>
		</Card>
	)
}
