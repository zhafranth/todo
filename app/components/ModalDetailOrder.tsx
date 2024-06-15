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
import useFormPayload from "./hooks/useFormState";
import { formatCurrencyIDR } from "@/utils/formatCurrency";

interface ModalDetailOrderProps {
  visible: boolean;
  toggle: () => void;
}

const ModalDetailOrder: React.FC<ModalDetailOrderProps> = ({
  visible,
  toggle,
}) => {
  const { userProducts } = useFormPayload();
  return (
    <Modal isOpen={visible} onOpenChange={toggle} size="sm" placement="center">
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
              <div className="flex justify-between">
                <h2 className="text-sm">Detail Pesanan</h2>
                <h2 className="text-sm">Harga</h2>
              </div>
              {userProducts?.map(({ data: { name, price }, total }, index) => (
                <div className="flex justify-between" key={index}>
                  <p>
                    {name}: {formatCurrencyIDR(price)} x {total}{" "}
                  </p>
                  <p className="font-semibold">
                    {formatCurrencyIDR(price * total)}
                  </p>
                </div>
              ))}
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
