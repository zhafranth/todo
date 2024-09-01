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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useFormPayload from "./hooks/useFormState";
import { formatCurrencyIDR } from "@/utils/formatCurrency";
import Lottie from "react-lottie";
import animationData from "@/data/confetti.json";
import { useGetOrder, useOrder, useUpdateOrder } from "@/networks/hooks";
import { orderLocalStorage } from "./hooks/useLocalStorage";

interface ModalDetailOrderProps {
  visible: boolean;
  toggle: () => void;
}

const DEFAULT_VALUE = {
  name: "",
  telp: "",
};

const ModalDetailOrder: React.FC<ModalDetailOrderProps> = ({
  visible,
  toggle,
}) => {
  const { userProducts, resetProduct } = useFormPayload();
  const [userInfo, setUserInfo] = useState(DEFAULT_VALUE);
  const [success, setSuccess] = useState(false);
  const orderId = orderLocalStorage();
  const { mutate, isPending } = useOrder();
  const { mutate: handleUpdate, isPending: isPendingUpdate } = useUpdateOrder();

  const { data: detailOrder } = useGetOrder(orderId);

  const isUpdate = useMemo(() => {
    const { status } = detailOrder ?? {};
    return !detailOrder ? false : status !== 2;
  }, [detailOrder]);

  const calculatedTotal = useMemo(() => {
    const products = userProducts.reduce(
      (acc, item) => (acc += item.data.price * item.total),
      0
    );
    return products;
  }, [userProducts]);

  const handleChange = useCallback(
    (key: "name" | "telp", event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setUserInfo((prevState) => ({ ...prevState, [key]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const payload = {
      ...userInfo,
      status: 0,
      totalPrice: calculatedTotal,
      orders: userProducts.filter((item) => item.total !== 0),
    };
    if (isUpdate) {
      handleUpdate(
        {
          id: detailOrder?.id as string,
          orders: userProducts.filter((item) => item.total !== 0),
          totalPrice: calculatedTotal + (detailOrder?.totalPrice as number),
        },
        {
          onSuccess: () => {
            setSuccess(true);
            resetProduct();
            setTimeout(() => toggle(), 1000);
            setUserInfo(DEFAULT_VALUE);
          },
        }
      );
    } else {
      mutate(payload, {
        onSuccess: (data) => {
          setSuccess(true);
          resetProduct();
          setTimeout(() => toggle(), 1000);
          setUserInfo(DEFAULT_VALUE);
          localStorage?.setItem("order", JSON.stringify(data?.data));
        },
      });
    }
  }, [
    calculatedTotal,
    detailOrder,
    handleUpdate,
    isUpdate,
    mutate,
    resetProduct,
    toggle,
    userInfo,
    userProducts,
  ]);

  useEffect(() => {
    if (detailOrder) {
      const { name, telp } = detailOrder ?? {};
      setUserInfo({ name, telp });
    }
  }, [detailOrder]);

  return (
    <Modal
      isOpen={visible}
      onOpenChange={toggle}
      size="sm"
      placement="center"
      isDismissable
    >
      <ModalContent className="relative">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Order Detail
            </ModalHeader>
            <ModalBody className="relative">
              <Input
                label="Nama"
                onChange={(e) => handleChange("name", e)}
                isDisabled={isUpdate}
                value={userInfo.name}
              />
              <Input
                label="No. Telepon"
                onChange={(e) => handleChange("telp", e)}
                isDisabled={isUpdate}
                value={userInfo.telp}
              />

              <Divider className="my-5" />
              <div className="flex justify-between">
                <h2 className="text-sm">Detail Pesanan</h2>
                <h2 className="text-sm">Harga</h2>
              </div>
              {userProducts
                ?.filter((item) => item.total !== 0)
                .map(({ data: { name, price }, total }, index) => (
                  <div className="flex justify-between" key={index}>
                    <p>
                      {name}: {formatCurrencyIDR(price)} x {total}{" "}
                    </p>
                    <p className="font-semibold">
                      {formatCurrencyIDR(price * total)}
                    </p>
                  </div>
                ))}
              <div
                className={`absolute -bottom-5 right-0 ${
                  success ? "block" : "block"
                }`}
              >
                {success && (
                  <Lottie
                    height={200}
                    width={400}
                    isStopped={success}
                    options={{
                      loop: success,
                      autoplay: success,
                      animationData,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                  />
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Keluar
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isPending || isPendingUpdate}
                isDisabled={Object.values(userInfo).some(
                  (value) => value === ""
                )}
              >
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
