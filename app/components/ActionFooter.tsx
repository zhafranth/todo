"use client";

import { Button } from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ModalDetailOrder from "./ModalDetailOrder";

const ActionFooter = () => {
  const [isShow, setIsShow] = useState(false);

  const toggleModal = useCallback(() => setIsShow((prev) => !prev), []);
  return (
    <div className="fixed bottom-0 w-[30%] mb-6 z-20 mx-auto h-16 bg-[#2f2f3c] rounded-full flex justify-between items-center px-4 shadow-2xl">
      <div className="ml-4 text-white">
        <p className="text-xs font-light">Total</p>
        <h4 className="font-semibold">Rp 5.000</h4>
      </div>
      <Button
        className="rounded-full"
        startContent={<FaArrowRight />}
        color="primary"
        onPress={toggleModal}
      >
        Order
      </Button>
      <ModalDetailOrder visible={isShow} toggle={toggleModal} />
    </div>
  );
};

export default ActionFooter;
