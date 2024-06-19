import { formatCurrencyIDR } from "@/utils/formatCurrency";
import type { Order } from "@prisma/client";
import StatusField from "../components/StatusField";
import dayjs from "dayjs";
import { Button } from "@nextui-org/react";

export const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "telp",
    label: "No.Telp",
  },
  {
    key: "totalPrice",
    label: "Price",
    render: ({ totalPrice }: Order) => (
      <p className="text-white">{formatCurrencyIDR(totalPrice)}</p>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: ({ status }: Order) => <StatusField value={status} />,
  },
  {
    key: "createdAt",
    label: "Created At",
    render: ({ createdAt }: Order) => (
      <p className="text-white">{dayjs(createdAt).format("DD MMM YYYY")}</p>
    ),
  },
  {
    key: "action",
    label: "ACTION",
    render: ({ id }: Order) => (
      <div className="flex px-6 gap-x-2 py-3">
        <Button color="success">Detail Order</Button>
      </div>
    ),
  },
];
