declare interface nodeTypes extends documentCommon {
  name: string;
  description: string;
  price: number;
  total_seats: number;
  sold_seats: number;
  total_sold_amount: number;
  price_increment: number;
  price_increment_milestone: number;
}
