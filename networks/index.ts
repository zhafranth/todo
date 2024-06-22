import { getOrderList, getProductList } from "@/data/data";
import {
  deleteProduct,
  updateOrderStatus,
  createOrder,
  deleteOrder,
} from "@/lib/actions";
import { PayloadOrders } from "./payload.interface";

export const getOrders = async () => {
  const response = await getOrderList();
  return response;
};

export const getProducts = async () => {
  const response = await getProductList();
  return response;
};

export const updateStatus = async (data: { status: number; id: string }) => {
  const response = await updateOrderStatus(data);
  return response;
};

export const delProduct = async (id: string) => {
  const response = await deleteProduct(id);
  return response;
};

export const postOrder = async (data: PayloadOrders) => {
  const response = await createOrder(data);
  return response;
};

export const delOrder = async (id: string) => {
  const response = await deleteOrder(id);
  return response;
};
