import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { type Schema } from '@/../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { useState } from 'react';
import { Input } from '@heroui/input';
import { Divider } from '@heroui/divider';
import {Checkbox} from "@heroui/checkbox";

const client = generateClient<Schema>();



/**
 * TrackAddModal component allows users to add a new track by providing necessary details
 * such as name, country, state, and city. It displays a modal with input fields for each
 * detail and a button to submit the form.
 *
**/
export default function TrackAddModal({ isOpen, onClose, updateCallback }: { isOpen: boolean, onClose: () => void, updateCallback: () => void }) {
  const [track, setTrack] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
    direction: false,
    mirror: false,
    shape: [],
    elevation: [],
    banking: [],
  });

  async function handleAddTrack() {
    const { errors, data } = await client.models.Track.create({
      name: track["name"],
      country: track["country"],
      state: track["state"],
      city: track["city"],
      direction: track["direction"],
      mirror: track["mirror"],
      shape: track["shape"],
      elevation: track["elevation"],
      banking: track["banking"],
    })
    console.log(errors, data);
    updateCallback();
    return;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTrack((prev) => ({ ...prev, [name]: value }));
  }


  return (
    <Modal isOpen={isOpen} size='lg' onClose={onClose} radius='none'>
      <ModalContent className="border-white border-1 bg-background">
        {(onClose) => (
          <>
            <ModalHeader className="justify-center">Add Track</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                name="name"
                value={track.name}
                onChange={handleChange}
                className="mb-4"
                placeholder="Enter track name"
                type="text"
                label="Name"
                variant="underlined"
              />
              <Input
                name="country"
                value={track.country}
                onChange={handleChange}
                className="mb-4"
                placeholder="Enter country name"
                type="text"
                label="Country"
                variant="underlined"
              />
              <Input
                name="state"
                value={track.state}
                onChange={handleChange}
                className="mb-4"
                placeholder="Enter state name"
                type="text"
                label="State"
                variant="underlined"
              />
              <Input
                name="city"
                value={track.city}
                onChange={handleChange}
                className="mb-4"
                placeholder="Enter city name"
                type="text"
                label="City"
                variant="underlined"
              />
              
          </div>
          <Divider />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <Checkbox defaultSelected radius="none" color="danger" size="sm">
              Direction Forward?
            </Checkbox>
            <Checkbox defaultSelected radius="none" color="danger" size="sm">
              Mirror?
            </Checkbox>
          </div>
          <Divider />

      </ModalBody>
      <ModalFooter className="justify-end">
        <Button color="primary" onPress={() => { handleAddTrack(); onClose(); }}>
          Add
        </Button>
      </ModalFooter>
    </>
  )
}
        </ModalContent >
      </Modal >
    )
}
