"use client";

import React from "react";
import { Tab, Tabs } from "@nextui-org/react";
import TabProduct from "@/app/controller/components/Tabs/TabProduct";
import TabOrder from "./Tabs/TabOrder";

const ListTabs = () => {
  const tabs = [
    {
      id: "products",
      label: "Products",
      content: <TabProduct />,
    },
    {
      id: "orders",
      label: "Orders",
      content: (
        <>
          <TabOrder />
        </>
      ),
    },
  ];

  return (
    <div className="flex justify-center flex-col items-center">
      <Tabs
        aria-label="dinamic tabs"
        items={tabs}
        radius="full"
        color="primary"
        classNames={{
          tabList: "bg-[#32323d]",
        }}
      >
        {(item) => (
          <Tab key={item.id} title={item.label} className="w-full">
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ListTabs;
