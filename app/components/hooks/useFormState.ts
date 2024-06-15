import { create } from "zustand";
import type { Product } from "@prisma/client";

interface useFormPayloadProps {
  userProducts:
    | {
        total: number;
        data: Product;
      }[]
    | [];
  setUserProducts: (
    payload: {
      total: number;
      data: Product;
    }[]
  ) => void;
  actionProduct: (id: string, action: "plus" | "minus") => void;
}

const useFormPayload = create<useFormPayloadProps>((set) => ({
  userProducts: [],
  setUserProducts: (
    payload: {
      total: number;
      data: Product;
    }[]
  ) => set(() => ({ userProducts: payload })),
  actionProduct: (id, action) =>
    set(({ userProducts = [] }) => {
      const item = userProducts?.find(({ data }) => data?.id === id);
      if (item) {
        action === "plus" ? (item.total += 1) : (item.total -= 1);
      }
      return { userProducts: [...userProducts] || [] };
    }),
}));

export default useFormPayload;
