import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";
import type { Order, Product, OrderItem } from "@prisma/client";
import { formatCurrencyIDR } from "@/utils/formatCurrency";
import { useUpdateOrderStatus } from "@/networks/hooks";

type DetailOrders = {
  data: Order & {
    orders: (OrderItem & {
      data: Product;
    })[];
  };
};

const DetailOrder = ({ data }: DetailOrders) => {
  const [visible, setVisible] = useState(false);
  const { mutate, isPending } = useUpdateOrderStatus();
  const { orders, id, status } = data ?? {};

  const toggle = useCallback(() => setVisible((prev) => !prev), []);

  const userInfo = useMemo(() => {
    const { name, telp, totalPrice } = data ?? {};
    return [
      {
        label: "Nama",
        value: name,
      },
      {
        label: "No.Telp",
        value: telp,
      },
      {
        label: "Total Price",
        value: formatCurrencyIDR(totalPrice),
      },
    ];
  }, [data]);

  const handleChangeStatus = useCallback(
    (status: number) => {
      mutate(
        {
          id,
          status,
        },
        {
          onSuccess: toggle,
        }
      );
    },
    [id, mutate, toggle]
  );

  return (
    <>
      <Button
        color="success"
        className="text-white rounded-full"
        size="sm"
        onClick={toggle}
      >
        Detail Order
      </Button>

      {visible && (
        <Modal isOpen onOpenChange={toggle} isDismissable>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Order Detail
                </ModalHeader>
                <ModalBody>
                  <Divider />
                  {userInfo.map(({ label, value }, index) => (
                    <div className="" key={index}>
                      <p className="font-light text-xs text-neutral-500">
                        {label}
                      </p>
                      <p className="font-semibold text-neutral-800">{value}</p>
                    </div>
                  ))}
                  <Divider />
                  {orders.map(({ data: { name, price }, total }, index) => (
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
                  <Button
                    radius="full"
                    color="warning"
                    variant="flat"
                    onPress={() => handleChangeStatus(0)}
                    isDisabled={status === 0}
                    isLoading={isPending}
                  >
                    Not Started
                  </Button>
                  <Button
                    radius="full"
                    color="primary"
                    variant="flat"
                    onPress={() => handleChangeStatus(1)}
                    isDisabled={status === 1}
                    isLoading={isPending}
                  >
                    Started
                  </Button>
                  <Button
                    radius="full"
                    variant="flat"
                    color="success"
                    onPress={() => handleChangeStatus(2)}
                    isDisabled={status === 2}
                    isLoading={isPending}
                  >
                    Done
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default DetailOrder;
