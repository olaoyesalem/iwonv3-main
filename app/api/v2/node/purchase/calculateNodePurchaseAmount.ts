export default function calculateNodePurchaseAmount(
  node?: nodeTypes,
  purchase_seats?: number
) {
  if (!node || !purchase_seats)
    return {
      seatsAtCurrentPrice: 0,
      seatsAtNextPrice: 0,
      currentPrice: 0,
      nextPrice: 0,
      totalAmount: 0,
    };

  const { sold_seats, price, price_increment, price_increment_milestone } =
    node;

  // Calculate how many milestones have passed
  const milestonesPassed = Math.floor(sold_seats / price_increment_milestone);

  // Adjust the current price based on milestones passed
  const currentPrice = price + milestonesPassed * price_increment;

  // Calculate remaining seats at the current price
  const remainingSeatsAtCurrentPrice =
    price_increment_milestone - (sold_seats % price_increment_milestone);

  // Determine how many seats will be at the current and next prices
  const seatsAtCurrentPrice = Math.min(
    purchase_seats,
    remainingSeatsAtCurrentPrice
  );

  const seatsAtNextPrice = purchase_seats - seatsAtCurrentPrice;

  // Calculate the price at the next milestone
  const nextPrice = currentPrice + price_increment;

  // Total amount calculation
  const totalAmount =
    seatsAtCurrentPrice * currentPrice + seatsAtNextPrice * nextPrice;

  return {
    seatsAtCurrentPrice,
    seatsAtNextPrice,
    currentPrice,
    nextPrice,
    totalAmount,
  };
}
