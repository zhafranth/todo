"use client";

import { Product } from "@prisma/client";
import React, { useEffect } from "react";
import useFormPayload from "./hooks/useFormState";
import Card from "./Card";

interface IListProducts {
  data: Product[];
}

const ListProducts: React.FC<IListProducts> = ({ data }) => {
  const { setUserProducts, userProducts } = useFormPayload();

  useEffect(() => {
    setUserProducts(data?.map((item) => ({ data: item, total: 0 })));
  }, [data]);

  return (
    <>
      {userProducts?.map((item, index) => (
        <Card key={index} data={item} />
      ))}
    </>
  );
};

export default ListProducts;
