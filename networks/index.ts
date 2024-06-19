import { getOrderList, getProductList } from "@/data/data";

export const getOrders = async () => {
  const response = await getOrderList();
  return response;
};

export const getProducts = async () => {
  const response = await getProductList();
  return response;
};
