import { Button } from '@heroui/button';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@heroui/modal';
import { type Schema } from '@/../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';

const client = generateClient<Schema>();


export default function TrackAddModal({isOpen, onClose, updateCallback}: {isOpen: boolean, onClose: () => void, updateCallback: () => void}) {
    async function handleAddTrack() {
        const { errors, data } = await client.models.Track.create({
            name: "My Track 2",
            country: "United States of America",
            state: "New York",
            city: "New York",
            direction: true,
            mirror: false,
            shape: [
                { type: "Straight", length: 100 },
                { type: "RightTurn", length: 100, cornerRadius: 50 },
                { type: "Straight", length: 100 },
                { type: "LeftTurn", length: 100, cornerRadius: 50 },
            ],
            elevation: [
                { point: 0, elevation: 0 },
                { point: 100, elevation: 0 },
                { point: 200, elevation: 0 },
            ],
            banking: [
                { point: 0, banking: 0 },
                { point: 100, banking: 0 },
                { point: 200, banking: 0 },
            ],
        })
        console.log(errors, data);
        updateCallback();
        return;
    }

    return (
        <Modal isOpen={isOpen} size='lg' onClose={onClose} radius='none'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col justify-center gap-1">Add Track</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => { handleAddTrack(); onClose(); }}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}