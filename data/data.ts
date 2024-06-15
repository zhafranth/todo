import { prisma } from "@/lib/prisma";

export const getProductList = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};
