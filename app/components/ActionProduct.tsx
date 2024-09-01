import { useProduct } from "@/networks/hooks";
import { Button } from "@nextui-org/react";
import React, { useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ActionProduct = ({ id }: { id: string }) => {
  const { deleteProduct } = useProduct();
  const { mutate, isPending } = deleteProduct;
  const handleDeleteProduct = useCallback(
    (id: string) => {
      mutate(id);
    },
    [mutate]
  );

  return (
    <div className="flex gap-x-2">
      <Button color="primary" isIconOnly radius="full">
        <FaEdit />
      </Button>
      <Button
        color="danger"
        onPress={() => handleDeleteProduct(id)}
        isLoading={isPending}
        isIconOnly
        radius="full"
      >
        <FaTrash />
      </Button>
    </div>
  );
};

export default ActionProduct;
