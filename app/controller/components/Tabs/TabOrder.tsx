import Table from "@/app/components/Table";
import { columns } from "@/app/enums/order";
import { useGetOrders } from "@/networks/hooks";
import React from "react";

const TabOrder = () => {
  const { data, isLoading } = useGetOrders();
  return (
    <>
      <Table columns={columns} data={data} isLoading={isLoading} />
    </>
  );
};

export default TabOrder;
