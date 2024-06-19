import { deleteProduct } from "@/lib/actions";
import { Button } from "@nextui-org/react";
import React, { useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ActionProduct = ({ id }: { id: string }) => {
  const handleDeleteProduct = useCallback((id: string) => {
    deleteProduct(id);
  }, []);
  return (
    <div className="flex px-6 gap-x-2 py-3">
      <Button color="primary">
        <FaEdit />
      </Button>
      <Button color="danger" onPress={() => handleDeleteProduct(id)}>
        <FaTrash />
      </Button>
    </div>
  );
};

export default ActionProduct;
