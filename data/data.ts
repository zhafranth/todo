"use server";

import { prisma } from "@/lib/prisma";

export const getProductList = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error("Failed to fetch product data");
  }
};

export const getOrderList = async (status?: number) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orders: {
          include: {
            data: true,
          },
        },
      },
      where: {
        status: status,
      },
    });
    return orders;
  } catch (error) {
    throw new Error("Failed to fetch order data");
  }
};
