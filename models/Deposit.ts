import { Schema, model, Types, models } from "mongoose";

const depositSchema = new Schema<depositType>(
  {
    amount: { type: Number, required: true },
    userId: { type: Types.ObjectId as any, required: true },
    lockPeriodEnd: { type: String, required: true },

    status: {
      type: String,
      required: true,
      enum: ["success", "pending", "failed", "rejected"],
      default: "success",
    },

    profit: { type: Number, default: 0 },
    from: { type: String },
    to: { type: String },
  },
  { timestamps: true }
);

export default models.Deposit || model<depositType>("Deposit", depositSchema);
