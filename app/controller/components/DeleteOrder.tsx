import { useDeleteOrder } from "@/networks/hooks";
import { Button } from "@nextui-org/react";
import React, { useCallback } from "react";
import { FaTrash } from "react-icons/fa";

const DeleteOrder = ({ id }: { id: string }) => {
  const { mutate } = useDeleteOrder();
  const handleDelete = useCallback(() => mutate(id), [id, mutate]);
  return (
    <Button
      color="danger"
      isIconOnly
      size="sm"
      isLoading={false}
      radius="full"
      onPress={handleDelete}
    >
      <FaTrash />
    </Button>
  );
};

export default DeleteOrder;
