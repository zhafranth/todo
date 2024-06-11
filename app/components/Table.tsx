"use client";

import React, { useCallback } from "react";
import { Button } from "@nextui-org/react";
import type { Product } from "@prisma/client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteProduct } from "@/lib/actions";

const Table = ({ data }: { data: Product[] }) => {
  const handleDeleteProduct = useCallback((id: string) => {
    deleteProduct(id);
  }, []);

  return (
    <table className="w-full text-sm text-left text-gray-500 mt-8">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="px-6 py-3">No.</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Price</th>
          <th className="px-6 py-3">Description</th>
          <th className="px-6 py-3">Cover</th>
          <th className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map(({ id, name, description, price, cover }, index) => (
          <tr key={id} className="bg-white border-b">
            <td className="px-6 py-3">{index + 1}</td>
            <td className="px-6 py-3">{name}</td>
            <td className="px-6 py-3">{price}</td>
            <td className="px-6 py-3">{description}</td>
            <td className="px-6 py-3">
              <div className="w-12 h-12 overflow-hidden">
                <img src={cover} alt={name} className="object-cover w-full" />
              </div>
            </td>
            <td className="flex px-6 gap-x-2 py-3">
              <Button color="primary">
                <FaEdit />
              </Button>
              <Button color="danger" onPress={() => handleDeleteProduct(id)}>
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
