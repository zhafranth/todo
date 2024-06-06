"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export const createTodo = async (data: any) => {
  try {
    await prisma.todo.create({
      data,
    });

    revalidatePath("/");
    return { status: 200 };
  } catch (error) {
    return {
      message: "Failed to create contact",
    };
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    return { status: 200 };
  } catch (error) {
    return {
      message: "Failed to delete contact",
    };
  }
};
