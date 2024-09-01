export const orderLocalStorage = () => {
  let orderID = null;
  if (typeof window !== "undefined") {
    const { id } = JSON.parse(localStorage?.getItem("order") as string) ?? {};
    orderID = id || null;
  }

  return orderID;
};
