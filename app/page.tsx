// "use client";

// import { useCallback, useEffect, useState } from "react";
import ActionTodo from "./components/ActionTodo";
import Table from "./components/Table";
import { getProductList } from "@/data/data";

const Home = async () => {
  const products = await getProductList();
  // const [products, setProducts] = useState([]);

  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await fetch("/api/products", {
  //       method: "GET",
  //     });
  //     const { data: list = [] } = await response.json();
  //     setProducts(list);
  //   } catch (error) {
  //     console.log("error:", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  return (
    <div className="h-screen px-24 py-16">
      <ActionTodo type="add" />
      <Table data={products} />
    </div>
  );
};

export default Home;
