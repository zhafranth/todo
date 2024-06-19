import React from "react";
import ActionTodo from "../../../components/ActionTodo";
import Table from "../../../components/Table";

import { useGetProducts } from "@/networks/hooks";
import { columns } from "@/app/enums/product";

const TabProduct = () => {
  const { data, isLoading } = useGetProducts();
  return (
    <>
      <>
        <ActionTodo type="add" />
        <Table data={data} columns={columns} isLoading={isLoading} />
      </>
    </>
  );
};

export default TabProduct;
