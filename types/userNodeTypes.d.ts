declare interface userNodeTypes extends documentCommon {
  userId: userSchemaType;
  nodeId: Types.ObjectId;
  seats_purchased: number;
  price: number;
  totalCost: number;

  purchaseCalculatedData?: {
    seatsAtCurrentPrice: number;
    seatsAtNextPrice: number;
    currentPrice: number;
    nextPrice: number;
    totalAmount: number;
  };

  blockchain?: {
    txID?: string;
    fromWallet?: string;
    toWallet?: string;
    currency?: string;
  };
}
