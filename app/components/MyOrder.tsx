import { Button } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import ModalMyOrder from "./ModalMyOrder";
import { orderLocalStorage } from "./hooks/useLocalStorage";

const MyOrder = () => {
  const [visible, setVisible] = useState(false);
  const orderId = orderLocalStorage();
  const toggle = useCallback(() => setVisible((prev) => !prev), []);

  if (!orderId) {
    return null;
  }

  return (
    <>
      <Button
        isIconOnly
        radius="full"
        color="danger"
        onPress={toggle}
        size="sm"
      >
        <FaShoppingBasket />
      </Button>
      {visible && <ModalMyOrder toggle={toggle} />}
    </>
  );
};

export default MyOrder;
