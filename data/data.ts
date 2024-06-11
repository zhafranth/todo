import { prisma } from "@/lib/prisma";

export const getProductList = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};
