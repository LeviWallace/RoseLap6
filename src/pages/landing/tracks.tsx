import DefaultLayout from "@/layouts/default";
import TrackContainer from "@/components/tracks/track-container";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/../amplify/data/resource';
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import TrackAddModal from "@/components/tracks/track-add-modal";

const client = generateClient<Schema>();

type Track = Schema['Track']['type'];

export default function TracksPage() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [search, setSearch] = useState<string>("");

    const {isOpen, onOpen, onClose} = useDisclosure();


    async function handleGetTracks() {
        const { data, errors } = await client.models.Track.list();
        if (errors) {
            console.error(errors);
            return;
        }
        const allTracks = data as Track[];
        setTracks(allTracks);
        console.log(data, tracks); 
    }
    
    useEffect(() => {
        handleGetTracks();
    }, []);

    async function handleSearchTracks() {
        const { data, errors } = await client.models.Track.list({
            filter: {
                name: {
                    contains: search,
                },
            },
        });
        if (errors) {
            console.error(errors);
            return;
        }
        const allTracks = data as Track[];
        setTracks(allTracks);
        console.log(data, tracks);
    }


    function handleTrackAddModal(): void {
        onOpen();
    }

    return (
        <>
        <TrackAddModal isOpen={isOpen} onClose={onClose} updateCallback={handleGetTracks}></TrackAddModal>
        <DefaultLayout>
            <div className="flex justify-between items-center space-x-2">
                <Input
                    name="password"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="my-7 px-4"
                    placeholder="Search All Tracks.."
                    type="text"
                    label="Password"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}/>
                <Button onPress={handleSearchTracks}>Search</Button>
                <Button onPress={() => handleTrackAddModal()}>Add Track</Button>
            </div>
            <TrackContainer tracks={tracks} updateCallback={handleGetTracks}/>
        </DefaultLayout>
        </>
    )
}