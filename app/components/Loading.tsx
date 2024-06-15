import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  const cardLoader = [1, 2];
  return (
    <>
      {cardLoader.map((item) => (
        <Card key={item} className="w-[80%] space-y-5 p-4 dark" radius="lg">
          <Skeleton className="rounded-lg dark">
            <div className="h-16 rounded-lg "></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-blue-200"></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Loading;
