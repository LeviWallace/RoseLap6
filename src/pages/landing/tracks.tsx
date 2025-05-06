import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";

import { type Schema } from "@/../amplify/data/resource";
import TrackContainer from "@/components/tracks/track-container";
import DefaultLayout from "@/layouts/default";
import TrackAddModal from "@/components/tracks/track-add-modal";

const client = generateClient<Schema>();

type Track = Schema["Track"]["type"];

/**
 * TracksPage component is responsible for displaying and managing a list of tracks.
 * It includes functionalities for fetching tracks, searching tracks, and adding new tracks.
 *
 * @component
 * @example
 * return (
 *   <TracksPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function TracksPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [search, setSearch] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <>
      <TrackAddModal
        isOpen={isOpen}
        updateCallback={handleGetTracks}
        onClose={onClose}
      />
      <DefaultLayout>
        <div className="flex justify-between items-center space-x-2">
          <Input
            className="my-7 px-4"
            label="Tracks"
            name="tracks"
            placeholder="Search All Tracks.."
            type="text"
            value={search}
            variant="underlined"
            onChange={handleInputChange}
          />
          <Button
            className="border-1 rounded-sm border-foreground"
            size="lg"
            variant="bordered"
            onPress={handleSearchTracks}
          >
            Search
          </Button>
          <Button
            className="border-1 rounded-sm border-foreground"
            size="lg"
            variant="bordered"
            onPress={() => handleTrackAddModal()}
          >
            Add Track
          </Button>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between m-2 p-2">
          <TrackContainer tracks={tracks} updateCallback={handleGetTracks} />
        </div>
      </DefaultLayout>
    </>
  );
}
