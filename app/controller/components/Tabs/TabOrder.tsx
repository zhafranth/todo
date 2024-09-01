import Table from "@/app/components/Table";
import { columns } from "@/app/enums/order";
import { useGetOrders } from "@/networks/hooks";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import React from "react";

const TabOrder = () => {
  const [value, setValue] = React.useState<string>("99");

  const { data, isLoading } = useGetOrders(
    value === "99" ? undefined : Number(value)
  );

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const options = [
    {
      key: 0,
      label: "Not Started",
    },
    {
      key: 1,
      label: "Started",
    },
    {
      key: 2,
      label: "Done",
    },
    {
      key: 99,
      label: "All",
    },
  ];

  return (
    <>
      <Select
        items={options}
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs dark"
        selectedKeys={[value]}
        onChange={handleSelectionChange}
      >
        {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
      </Select>
      <Table columns={columns} data={data} isLoading={isLoading} />
    </>
  );
};

export default TabOrder;
