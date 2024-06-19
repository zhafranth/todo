import { Button } from "@nextui-org/react";
import { Product } from "@prisma/client";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import useFormPayload from "./hooks/useFormState";
import { formatCurrencyIDR } from "@/utils/formatCurrency";

interface ICard {
  data: {
    data: Product;
    total: number;
  };
}

const Card: React.FC<ICard> = ({ data }) => {
  const { actionProduct } = useFormPayload((state) => state);
  const { data: payload, total } = data ?? {};
  const { name, price, id, cover } = payload ?? {};
  return (
    <div className="w-[80%] bg-[#1d1d22] h-[150px] rounded-lg p-5 flex items-center gap-x-4 cursor-pointer">
      <div className="h-full w-1/2 bg-[#26262d] rounded-lg">
        <img src={cover} alt={name} />
      </div>
      <div className="flex flex-col h-full">
        <h4 className="text-white font-bold">{name}</h4>
        <p className="text-white text-xs font-light">
          {formatCurrencyIDR(price)}/Jam
        </p>
        <div className="flex mt-auto">
          <Button
            isIconOnly
            size="sm"
            className="rounded-tr-none rounded-br-none bg-blue-200"
            onPress={() => actionProduct(id, "minus")}
            isDisabled={total === 0}
          >
            <FaMinus />
          </Button>
          <div className="h-full text-white bg-[#656586] w-10 flex justify-center items-center">
            {total}
          </div>
          <Button
            isIconOnly
            size="sm"
            className="rounded-tl-none rounded-bl-none bg-blue-200"
            onPress={() => actionProduct(id, "plus")}
          >
            <FaPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
