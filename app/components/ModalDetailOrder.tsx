"use client";

import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";

interface ModalDetailOrderProps {
  visible: boolean;
  toggle: () => void;
}

const ModalDetailOrder: React.FC<ModalDetailOrderProps> = ({
  visible,
  toggle,
}) => {
  return (
    <Modal isOpen={visible} onOpenChange={toggle} size="sm">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Order Detail
            </ModalHeader>
            <ModalBody>
              <Input label="Nama" />
              <Input label="No. Telepon" />
              <Divider className="my-5" />
              <h2 className="text-sm">Total Harga</h2>
              <p className="font-semibold">Playstation 5 : Rp.5000</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Keluar
              </Button>
              <Button color="primary" onPress={onClose}>
                Pesan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailOrder;
