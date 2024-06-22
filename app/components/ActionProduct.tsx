import { useDeleteProduct } from "@/networks/hooks";
import { Button } from "@nextui-org/react";
import React, { useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ActionProduct = ({ id }: { id: string }) => {
  const { mutate, isPending } = useDeleteProduct();
  const handleDeleteProduct = useCallback(
    (id: string) => {
      mutate(id);
    },
    [mutate]
  );

  return (
    <div className="flex px-6 gap-x-2 py-3">
      <Button color="primary">
        <FaEdit />
      </Button>
      <Button
        color="danger"
        onPress={() => handleDeleteProduct(id)}
        isLoading={isPending}
      >
        <FaTrash />
      </Button>
    </div>
  );
};

export default ActionProduct;
