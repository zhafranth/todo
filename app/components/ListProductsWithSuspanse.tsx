import React from "react";
import { getProductList } from "@/data/data";
import ListProducts from "./ListProducts";

const ListProductsWithSuspense = async () => {
  const products = await getProductList();
  return <ListProducts data={products} />;
};

export default ListProductsWithSuspense;
