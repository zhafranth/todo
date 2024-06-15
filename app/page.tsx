import ActionFooter from "./components/ActionFooter";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
import ListProductsWithSuspanse from "./components/ListProductsWithSuspanse";

const Home = async () => {
  return (
    <div className="container min-h-screen bg-[#131315]">
      <div className=" flex justify-center items-center py-8 flex-col gap-y-8">
        <Suspense fallback={<Loading />}>
          <ListProductsWithSuspanse />
        </Suspense>
      </div>
      <ActionFooter />
    </div>
  );
};

export default Home;
