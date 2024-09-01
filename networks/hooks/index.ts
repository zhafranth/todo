import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  delOrder,
  delProduct,
  getOrderDetail,
  getOrders,
  getProducts,
  postOrder,
  postProduct,
  updateStatus,
} from "..";
import { PayloadOrders } from "../payload.interface";
import { updateDataOrder } from "@/lib/actions";

export const useGetOrders = (status?: number) => {
  return useQuery({
    queryKey: ["orders", status],
    queryFn: () => getOrders(status),
  });
};

export const useGetOrder = (id?: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderDetail(id as string),
    enabled: !!id,
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { status: number; id: string }) => updateStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useOrder = () => {
  return useMutation({
    mutationFn: (data: PayloadOrders) => postOrder(data),
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => delOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: (data: {
      id: string;
      totalPrice: number;
      orders: { data: { id: string }; total: number }[];
    }) => updateDataOrder(data),
  });
};

export const useProduct = () => {
  const queryClient = useQueryClient();

  const createProducts = useMutation({
    mutationFn: (data: FormData) => postProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => delProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return { createProducts, deleteProduct };
};
