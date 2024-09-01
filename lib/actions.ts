"use server";

import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, rm } from "fs/promises";
import _ from "lodash";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createProduct = async (formData: FormData) => {
  const name = (formData.get("name") as string) || "";
  const price = (formData.get("price") as string) || 0;
  const description = (formData.get("description") as string) || "";
  const cover = (formData.get("cover") as File) || "";

  const buffer = Buffer.from(await cover.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return { status: 500 };
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${cover.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(cover.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    // Save to database
    const result = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        cover: fileUrl,
      },
    });

    revalidatePath("/");

    return { result };
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return { status: 500 };
  }
};

const deleteFile = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  const { cover } = product || {};

  const filePath = join(process.cwd(), "public", cover as string);

  try {
    await rm(filePath as string);
  } catch (e) {
    console.log("Error remove file", e);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await deleteFile(id);
    await prisma.product.delete({
      where: {
        id,
      },
    });

    return { status: 200 };
  } catch (error) {
    return {
      message: "Failed to delete product",
    };
  }
};

export const createOrder = async (data: {
  name: string;
  telp: string;
  totalPrice: number;
  status: number;
  orders: { data: { id: string }; total: number }[];
}) => {
  try {
    const { name, telp, totalPrice, status, orders } = data;
    const order = await prisma.order.create({
      data: {
        name,
        telp,
        totalPrice,
        status,
        orders: {
          create: orders.map((item) => ({
            total: item.total,
            data: {
              connect: { id: item.data.id },
            },
          })),
        },
      },
    });
    return {
      status: 200,
      data: {
        id: order.id,
      },
    };
  } catch (error) {
    console.log("error:", error);
  }
};

export const updateOrderStatus = async ({
  status,
  id,
}: {
  status: number;
  id: string;
}) => {
  try {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return { status: 200 };
  } catch (error) {
    console.log("error:", error);
  }
};

export const updateDataOrder = async ({
  id,
  orders,
  totalPrice,
}: {
  id: string;
  totalPrice: number;
  orders: { data: { id: string }; total: number }[];
}) => {
  try {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        totalPrice,
        orders: {
          create: orders.map((item) => ({
            total: item.total,
            data: {
              connect: { id: item.data.id },
            },
          })),
        },
      },
    });

    return {
      status: 200,
      data: {
        id: order.id,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    await prisma.order.delete({
      where: {
        id,
      },
    });
    return { status: 200 };
  } catch (error) {
    console.log(error);
  }
};

export const getDetailOrder = async (id: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orders: {
          include: {
            data: true,
          },
        },
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  }
};
