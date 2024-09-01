import { useGetOrder } from "@/networks/hooks";
import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import StatusField from "./StatusField";
import { formatCurrencyIDR } from "@/utils/formatCurrency";
import { orderLocalStorage } from "./hooks/useLocalStorage";

const ModalMyOrder = ({ toggle }: { toggle: () => void }) => {
  const orderId = orderLocalStorage();

  const { data } = useGetOrder(orderId);

  const { name, createdAt, status, telp, orders = [], totalPrice } = data ?? {};

  useEffect(() => {
    if (status && status === 2) {
      localStorage?.removeItem("order");
    }
  }, [status]);

  return (
    <Modal isOpen onOpenChange={toggle} isDismissable className="dark">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white">
              Orders
            </ModalHeader>
            <ModalBody>
              <Divider />
              <div className="flex">
                <div className="flex-1">
                  <p className="font-light text-xs text-neutral-500">Nama</p>
                  <p className="font-semibold text-neutral-200">{name}</p>
                </div>
                <div className="flex-1">
                  <p className="font-light text-xs text-neutral-500">No Telp</p>
                  <p className="font-semibold text-neutral-200">{telp}</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <p className="font-light text-xs text-neutral-500">Tanggal</p>
                  <p className="font-semibold text-neutral-200">
                    {dayjs(createdAt).format("DD MMM YYYY, HH:mm")}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-light text-xs text-neutral-500">Status</p>
                  <p className="font-semibold text-neutral-200">
                    <StatusField value={status as number} />
                  </p>
                </div>
              </div>
              <Divider />
              <h4 className="text-white font-bold">Detail Pesanan</h4>
              {orders.map(({ data, total }, index) => (
                <div className="flex justify-between text-white" key={index}>
                  <p className="text-sm text-neutral-500">
                    {data?.name}: {formatCurrencyIDR(data?.price as number)} x{" "}
                    {total}{" "}
                  </p>
                  <p className="font-semiboldtext-sm text-neutral-400">
                    {formatCurrencyIDR((data?.price as number) * total)}
                  </p>
                </div>
              ))}
              <div>
                <p className="text-white m-0 text-xs">Total</p>
                <p className="text-white font-semibold">
                  {formatCurrencyIDR(totalPrice as number)}
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                radius="full"
                color="warning"
                variant="flat"
                onPress={toggle}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalMyOrder;
