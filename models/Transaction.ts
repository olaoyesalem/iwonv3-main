import { Schema, model, Types, models } from "mongoose";

const transactionSchema = new Schema<TransactionType>(
  {
    title: { type: String, trim: true },
    amount: { type: Number, required: true },

    userId: { type: Types.ObjectId, required: true, ref: "User" },

    category: {
      type: String,
      required: true,
      enum: [
        "loan",
        "profit",
        "deposit",
        "transfer",
        "re-invest",
        "withdrawal",
        "signup-bonus",
        "node-purchase",
        "money-received",
        "referral-commision",
      ],
    },

    status: {
      type: String,
      required: true,
      enum: [
        "paid",
        "pending",
        "rejected",
        "processing",
        "successful",
        "action-needed",
      ],
    },

    blockchain: {
      txID: { type: String },
      fromWallet: { type: String },
      toWallet: { type: String },
      currency: { type: String },
    },

    withdrawalAddress: { type: String },
    receiverId: { type: Types.ObjectId },
    nodeId: { type: Types.ObjectId, ref: "Node" },
    userNodeId: { type: Types.ObjectId, ref: "UserNode" },

    commissionFrom: { type: String },
    nodePurchaseAdditional: { type: Object },

    // un-used
    senderName: { type: String },
    receiverName: { type: String },
    receiverEmail: { type: String },
    receiverPhoneNumber: { type: String },
    receiverAccountNumber: { type: String },
    receiverPaymentUsername: { type: String },
    note: String,
    amountToDeposit: Number,
    despositedAmount: Number,
    pendingBalance: Number,
    paymentTitle: { type: String },

    type: {
      type: String,
      enum: ["automatic-coin-payment", "manual-coin-payment", "bank-transfer"],
    },

    paymentProof: {
      url: { type: String },
      public_id: { type: String },
      secure_url: { type: String },
      format: { type: String },
      width: { type: Number },
      height: { type: Number },
      bytes: { type: Number },
      original_filename: { type: String },
      created_at: { type: String },
      etag: { type: String },
      thumbnail_url: { type: String },
    },
    automaticCoinPayment: {
      payment_id: { type: String },
      payment_status: { type: String },
      pay_address: { type: String },
      price_amount: { type: Number },
      price_currency: { type: String },
      pay_amount: { type: Number },
      pay_currency: { type: String },
      order_id: { type: String },
      order_description: { type: String },
      ipn_callback_url: { type: String },
      created_at: { type: Date },
      updated_at: { type: Date },
      purchase_id: { type: String },
      amount_received: { type: Number },
      payin_extra_id: { type: String },
      smart_contract: { type: String },
      network: { type: String },
      network_precision: { type: String },
      time_limit: { type: Date },
      expiration_estimate_date: { type: Date },
      is_fixed_rate: { type: String },
      valid_until: { type: Date },
      type: { type: String },
    },
    linkedTransactionId: { type: Types.ObjectId },
    loanDuration: { type: String },
    loanReason: String,
    loanDurationDate: { type: Number },

    walletAddress: {
      type: String,
      trim: true,
    },

    coinName: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default models.Transaction ||
  model<TransactionType>("Transaction", transactionSchema);
