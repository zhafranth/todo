import { formatCurrencyIDR } from "@/utils/formatCurrency";
import type { Order, OrderItem, Product } from "@prisma/client";
import StatusField from "../components/StatusField";
import dayjs from "dayjs";
import DetailOrder from "../components/DetailOrder";
import DeleteOrder from "../controller/components/DeleteOrder";

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
      <p className="text-white">
        {dayjs(createdAt).format("DD MMM YYYY, HH:mm")}
      </p>
    ),
  },
  {
    key: "action",
    label: "ACTION",
    render: (
      data: Order & {
        orders: (OrderItem & {
          data: Product;
        })[];
      }
    ) => (
      <div className="flex gap-x-2">
        <DetailOrder data={data} />
        <DeleteOrder id={data.id} />
      </div>
    ),
  },
];
