import { useQuery } from "@tanstack/react-query";
import { getOrders, getProducts } from "..";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
