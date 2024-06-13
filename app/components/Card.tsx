import { Button } from "@nextui-org/react";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Card = () => {
  return (
    <div className="w-[65%] bg-[#1d1d22] h-[150px] rounded-lg p-5 flex items-center gap-x-4 cursor-pointer">
      <div className="h-full w-1/2 bg-[#26262d] rounded-lg" />
      <div className="flex flex-col h-full">
        <h4 className="text-white font-bold">Playstation 5</h4>
        <p className="text-white text-xs font-light">Rp 5.000/Jam</p>
        <div className="flex mt-auto">
          <Button
            isIconOnly
            size="sm"
            className="rounded-tr-none rounded-br-none bg-blue-200"
          >
            <FaMinus />
          </Button>
          <div className="h-full text-white bg-[#656586] w-10 flex justify-center items-center">
            0
          </div>
          <Button
            isIconOnly
            size="sm"
            className="rounded-tl-none rounded-bl-none bg-blue-200"
          >
            <FaPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
