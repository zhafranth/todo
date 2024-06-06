"use client";

import React, { useCallback } from "react";
import { Button } from "@nextui-org/react";
import type { product } from "@prisma/client";
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = ({ data }: { data: product[] }) => {
  const handleDeleteTodo = useCallback((id: number) => {}, []);

  return (
    <table className="w-full text-sm text-left text-gray-500 mt-8">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="px-6 py-3">No.</th>
          <th className="px-6 py-3">Judul</th>
          <th className="px-6 py-3">Deskripsi</th>
          <th className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, description }, index) => (
          <tr key={id} className="bg-white border-b">
            <td className="px-6 py-3">{index + 1}</td>
            <td className="px-6 py-3">{name}</td>
            <td className="px-6 py-3">{description}</td>
            <td className="flex px-6 gap-x-2 py-3">
              <Button color="primary">
                <FaEdit />
              </Button>
              <Button color="danger" onPress={() => handleDeleteTodo(id)}>
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
