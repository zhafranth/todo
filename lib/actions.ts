"use server";

import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
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

  // const name = (formData.get("name") as string) || "";
  // const price = (formData.get("price") as string) || 0;
  // const description = (formData.get("description") as string) || "";
  // const cover = (formData.get("cover") as File) || "";

  // const buffer = Buffer.from(await cover.arrayBuffer());
  // const relativeUploadDir = `/uploads/${new Date(Date.now())
  //   .toLocaleDateString("id-ID", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   })
  //   .replace(/\//g, "-")}`;

  // const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  // try {
  //   await stat(uploadDir);
  // } catch (e: any) {
  //   if (e.code === "ENOENT") {
  //     // This is for checking the directory is exist (ENOENT : Error No Entry)
  //     await mkdir(uploadDir, { recursive: true });
  //   } else {
  //     console.error(
  //       "Error while trying to create directory when uploading a file\n",
  //       e
  //     );
  //     return NextResponse.json(
  //       { error: "Something went wrong." },
  //       { status: 500 }
  //     );
  //   }
  // }

  // try {
  //   const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  //   const filename = `${cover.name.replace(
  //     /\.[^/.]+$/,
  //     ""
  //   )}-${uniqueSuffix}.${mime.getExtension(cover.type)}`;
  //   await writeFile(`${uploadDir}/${filename}`, buffer);
  //   const fileUrl = `${relativeUploadDir}/${filename}`;

  //   // Save to database
  //   const result = await prisma.product.create({
  //     data: {
  //       name,
  //       description,
  //       price: Number(price),
  //       cover: fileUrl,
  //     },
  //   });

  //   revalidatePath("/");

  //   return NextResponse.json({ user: result });
  // } catch (e) {
  //   console.error("Error while trying to upload a file\n", e);
  //   return NextResponse.json(
  //     { error: "Something went wrong." },
  //     { status: 500 }
  //   );
  // }
};

export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    return { status: 200 };
  } catch (error) {
    return {
      message: "Failed to delete product",
    };
  }
};