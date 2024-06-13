import React from "react";
import ActionTodo from "../components/ActionTodo";
import Table from "../components/Table";
import { getProductList } from "@/data/data";

const ControllerPage = async () => {
  const products = await getProductList();
  return (
    <div className="h-screen px-24 py-16">
      <ActionTodo type="add" />
      <Table data={products} />
    </div>
  );
};

export default ControllerPage;
