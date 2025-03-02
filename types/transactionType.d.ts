declare interface TransactionType extends documentCommon {
  user?: userSchemaType;
  title: string;
  amount: number;
  userId: Types.ObjectId;
  receiverId?: Types.ObjectId;
  nodeId?: Types.ObjectId;
  userNodeId?: Types.ObjectId;

  category: transactionCategory;
  status: transactionStatus;

  blockchain?: {
    txID?: string;
    fromWallet?: string;
    toWallet?: string;
    currency?: string;
  };

  nodePurchaseAdditional?: {
    seatsAtCurrentPrice: number;
    seatsAtNextPrice: number;
    currentPrice: number;
    nextPrice: number;
    totalAmount: number;
  };

  withdrawalAddress?: string;

  // these for referrals commins, who deposited and who is the referral
  commissionFrom?: string;

  // us-used
  from?: string;
  to?: string;
  senderName?: string;
  amountToDeposit?: number;
  despositedAmount?: number;
  pendingBalance?: number;
  paymentTitle?: string;
  receiverName?: string;
  receiverEmail?: string;
  receiverPhoneNumber?: string;
  receiverAccountNumber?: string;
  receiverPaymentUsername?: string;
  loanDuration?: string;
  loanDurationDate?: number;
  loanReason?: string;
  note?: string;

  paymentProof?: {
    public_id: string;
    url: string;
    secure_url: string;
    format: string;
    width: number;
    height: number;
    bytes: number;
    original_filename: string;
    created_at: string;
    etag: string;
    thumbnail_url: string;
  };
  automaticCoinPayment?: {
    payment_id: string;
    payment_status: string;
    pay_address: string;
    price_amount: number;
    price_currency: string;
    pay_amount: number;
    pay_currency: string;
    order_id: string;
    order_description: string;
    ipn_callback_url: string;
    created_at: string | Date;
    updated_at: string | Date;
    purchase_id: string;
    amount_received: number;
    payin_extra_id: string;
    smart_contract: string;
    network: string;
    network_precision: string;
    time_limit: string | Date;
    expiration_estimate_date: string | Date;
    is_fixed_rate: string;
    valid_until: string | Date;
    type: string;
  };

  linkedTransactionId?: string;
  type?: "automatic-coin-payment" | "manual-coin-payment" | "bank-transfer";
  coinName?: string;
  walletAddress?: string;
}
