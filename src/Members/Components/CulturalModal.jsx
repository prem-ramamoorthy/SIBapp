import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState, useRef } from "react";

function CulturalComponent({ data }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-between">
        <span className="font-bold mr-2">வகையறா:</span>
        <span>{data.vagai_category ?? "N/A"}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="font-bold mr-2">குட்டம்:</span>
        <span>{data.kulam_category ?? "N/A"}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="font-bold mr-2">சேர்ந்த இடம்:</span>
        <span>{data.native_place ?? "N/A"}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="font-bold mr-2">குலதெய்வம்:</span>
        <span>{data.kuladeivam ?? "N/A"}</span>
      </div>
    </div>
  );
}

export function ModalViewercultural({ data = {} }) {
  const [openModal, setOpenModal] = useState(false);
  const initialFocusRef = useRef(null);

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="h-[40px] cursor-pointer w-[180px] bg-gray-100 dark:bg-gray-400 p-1 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 border-2 text-sm font-bold dark:text-black border-gray-400 dark:border-gray-600 relative -top-[32px] transition-colors duration-300"
      >
        Cultural Details
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        initialFocus={initialFocusRef}
      >
        <ModalHeader>Cultural Details</ModalHeader>
        <ModalBody>
          <div className="space-y-5 text-gray-900 dark:text-gray-100">
            <div className="text-base font-medium mb-2">
              <CulturalComponent data={data} />
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Button
                color="gray"
                onClick={() => setOpenModal(false)}
                ref={initialFocusRef}
              >
                Close
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
