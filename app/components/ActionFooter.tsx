"use client";

import { Button } from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ModalDetailOrder from "./ModalDetailOrder";
import useFormPayload from "./hooks/useFormState";
import { formatCurrencyIDR } from "@/utils/formatCurrency";

const ActionFooter = () => {
  const { userProducts } = useFormPayload();
  const calculatedTotal = useMemo(() => {
    const products = userProducts.reduce(
      (acc, item) => (acc += item.data.price * item.total),
      0
    );
    return products;
  }, [userProducts]);
  const [isShow, setIsShow] = useState(false);

  const toggleModal = useCallback(() => setIsShow((prev) => !prev), []);
  return (
    <div className="relative">
      <div className="fixed bottom-0 left-0 right-0 w-[80%] md:w-[30%] mb-6 z-20 mx-auto h-16 bg-[#2f2f3c] rounded-full flex justify-between items-center px-4 shadow-2xl">
        <div className="ml-4 text-white">
          <p className="text-xs font-light">Total</p>
          <h4 className="font-semibold">
            {formatCurrencyIDR(calculatedTotal)}
          </h4>
        </div>
        <Button
          className="rounded-full"
          startContent={<FaArrowRight />}
          color="primary"
          onPress={toggleModal}
          isDisabled={calculatedTotal === 0}
        >
          Order
        </Button>
        <ModalDetailOrder visible={isShow} toggle={toggleModal} />
      </div>
    </div>
  );
};

export default ActionFooter;
