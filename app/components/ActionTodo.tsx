"use client";

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
import { createProduct } from "@/lib/actions";
import { FaPlus } from "react-icons/fa";
import ImportButton from "./ImportButton";

const DEFAULT_VALUE: {
  name: string;
  price: string;
  description: string;
  cover?: File | null;
} = { name: "", price: "", description: "", cover: null };

const ActionTodo = ({ type }: { type: "add" | "edit" }) => {
  const [isShow, setIsShow] = useState(false);
  const [payload, setPayload] = useState(DEFAULT_VALUE);

  const toggleModal = useCallback(
    () => setIsShow((prevState) => !prevState),
    []
  );

  const handleChange = useCallback(
    (
      key: "name" | "price" | "description",
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      event.preventDefault();
      const { value } = event.target;
      setPayload((prevState) => ({ ...prevState, [key]: value }));
    },
    []
  );

  const handleChangeFile = useCallback((value: File | null) => {
    setPayload((prevState) => ({ ...prevState, cover: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const data = new FormData();
      data.set("cover", payload.cover as File);
      data.set("name", payload.name);
      data.set("price", payload.price);
      data.set("description", payload.description);

      const response = await createProduct(data);
      toggleModal();
      setPayload(DEFAULT_VALUE);
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const data = new FormData();
    //   data.set("cover", payload.cover as File);
    //   data.set("name", payload.name);
    //   data.set("price", payload.price);
    //   data.set("description", payload.description);

    //   const res = await fetch("/api/upload", {
    //     method: "POST",
    //     body: data,
    //   });

    //   if (!res.ok) throw new Error(await res.text());
    //   if (res.ok) {
    //     toggleModal();
    //     setPayload(DEFAULT_VALUE);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }, [payload, toggleModal]);

  return (
    <>
      <Button
        className="flex items-center gap-x-2"
        color="primary"
        onClick={toggleModal}
      >
        <FaPlus />
        Product
      </Button>
      <Modal isOpen={isShow} onOpenChange={toggleModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize">
                {type} Product
              </ModalHeader>
              <ModalBody>
                <Input
                  onChange={(e) => handleChange("name", e)}
                  value={payload.name}
                  type="text"
                  label="Name"
                />
                <Input
                  onChange={(e) => handleChange("price", e)}
                  value={payload.price}
                  type="text"
                  label="Price"
                />
                <Input
                  onChange={(e) => handleChange("description", e)}
                  value={payload.description}
                  type="text"
                  label="Description"
                />
                <ImportButton onChange={handleChangeFile} />
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
