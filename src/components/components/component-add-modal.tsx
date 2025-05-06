import { Modal, ModalContent } from "@heroui/modal";

import AddTireComponent from "./modals/add-tire-modal";
import AddTransmissionComponent from "./modals/add-transmission-modal";
import AddAerodynamicsComponent from "./modals/add-aerodynamics-modal";
import AddEngineComponent from "./modals/add-engine-modal";
import AddBrakesComponent from "./modals/add-brakes-modal";

/**
 * ComponentAddModal component allows users to add a new track by providing necessary details
 * such as name, country, state, and city. It displays a modal with input fields for each
 * detail and a button to submit the form.
 *
 **/

export default function ComponentAddModal({
  isOpen,
  onClose,
  updateCallback,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  updateCallback: () => void;
  type: string;
}) {
  return (
    <Modal
      isKeyboardDismissDisabled
      isDismissable={false}
      isOpen={isOpen}
      radius="none"
      size="5xl"
      onClose={onClose}
    >
      <ModalContent className="border-white border-1 bg-background">
        {(onClose) => (
          <>
            {type == "tire" && (
              <AddTireComponent
                updateCallback={updateCallback}
                onClose={onClose}
              />
            )}
            {type == "transmission" && (
              <AddTransmissionComponent
                updateCallback={updateCallback}
                onClose={onClose}
              />
            )}
            {type == "engine" && (
              <AddEngineComponent
                updateCallback={updateCallback}
                onClose={onClose}
              />
            )}
            {type == "aerodynamics" && (
              <AddAerodynamicsComponent
                updateCallback={updateCallback}
                onClose={onClose}
              />
            )}
            {type == "brakes" && (
              <AddBrakesComponent
                updateCallback={updateCallback}
                onClose={onClose}
              />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
