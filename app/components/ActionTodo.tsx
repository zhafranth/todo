"use client";

import { createTodo } from "@/lib/actions";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa";

const ActionTodo = ({ type }: { type: "add" | "edit" }) => {
  const [isShow, setIsShow] = useState(false);
  const [payload, setPayload] = useState({
    judul: "",
    deskripsi: "",
  });

  const toggleModal = useCallback(
    () => setIsShow((prevState) => !prevState),
    []
  );

  const handleChange = useCallback(
    (
      key: "judul" | "deskripsi",
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      event.preventDefault();
      const { value } = event.target;
      setPayload((prevState) => ({ ...prevState, [key]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    try {
      const res = await createTodo(payload);
      if (res.status === 200) {
        setPayload({
          deskripsi: "",
          judul: "",
        });
        toggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  }, [payload, toggleModal]);

  return (
    <>
      <Button
        className="flex items-center gap-x-2"
        color="primary"
        onClick={toggleModal}
      >
        <FaPlus />
        To Do
      </Button>
      <Modal isOpen={isShow} onOpenChange={toggleModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize">
                {type} To Do
              </ModalHeader>
              <ModalBody>
                <Input
                  onChange={(e) => handleChange("judul", e)}
                  value={payload.judul}
                  type="text"
                  label="Judul"
                />
                <Input
                  onChange={(e) => handleChange("deskripsi", e)}
                  value={payload.deskripsi}
                  type="text"
                  label="Deskripsi"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {type === "add" ? "Tambah" : "Simpan"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActionTodo;
