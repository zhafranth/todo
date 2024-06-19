import { Product } from "@prisma/client";
import ActionProduct from "../components/ActionProduct";
import { formatCurrencyIDR } from "@/utils/formatCurrency";

export const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "price",
    label: "PRICE",
    render: ({ price }: Product) => (
      <p className="text-white">{formatCurrencyIDR(price)}</p>
    ),
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "cover",
    label: "COVER",
    render: ({ cover, name }: Product) => (
      <div className="w-12 h-12 overflow-hidden">
        <img src={cover} alt={name} className="object-cover w-full" />
      </div>
    ),
  },
  {
    key: "action",
    label: "ACTION",
    render: ({ id }: Product) => <ActionProduct id={id} />,
  },
];
