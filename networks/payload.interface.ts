export interface PayloadOrders {
  name: string;
  telp: string;
  totalPrice: number;
  status: number;
  orders: {
    data: {
      id: string;
    };
    total: number;
  }[];
}
