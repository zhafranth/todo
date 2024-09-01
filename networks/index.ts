import { getOrderList, getProductList } from "@/data/data";
import {
  deleteProduct,
  updateOrderStatus,
  createOrder,
  deleteOrder,
  createProduct,
  getDetailOrder,
} from "@/lib/actions";
import { PayloadOrders } from "./payload.interface";

export const getOrders = async (status?: number) => {
  const response = await getOrderList(status);
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

export const postProduct = async (data: FormData) => {
  const response = await createProduct(data);
  return response;
};

export const getOrderDetail = async (id: string) => {
  const response = await getDetailOrder(id);
  return response;
};
