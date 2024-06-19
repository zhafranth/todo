"use client";

import { Chip } from "@nextui-org/react";
import React, { useMemo } from "react";

const StatusField = ({ value }: { value: number }) => {
  const options = useMemo(() => {
    return [
      {
        id: 0,
        label: "Not Started",
        color: "warning",
      },
      {
        id: 1,
        label: "Started",
        color: "primary",
      },
      {
        id: 2,
        label: "Done",
        color: "success",
      },
    ].find((item) => item.id === value);
  }, [value]);

  const { color = "default", label } = options ?? {};

  return (
    <Chip
      variant="dot"
      className="dark"
      color={
        color as
          | "default"
          | "primary"
          | "success"
          | "secondary"
          | "warning"
          | "danger"
          | undefined
      }
    >
      {label}
    </Chip>
  );
};

export default StatusField;
