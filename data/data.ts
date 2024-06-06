import { prisma } from "@/lib/prisma";

export const getToDoList = async () => {
  try {
    const toDoList = await prisma.todo.findMany();
    return toDoList;
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};
