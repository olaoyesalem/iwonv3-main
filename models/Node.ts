import { model, models, Schema } from "mongoose";

const nodeSchema = new Schema<nodeTypes>({
  name: { type: String },
  description: { type: String },

  price: { type: Number, required: true },
  total_seats: { type: Number, required: true },

  sold_seats: { type: Number, default: 0 },
  price_increment: { type: Number, default: 0 },
  price_increment_milestone: { type: Number, default: 0 },
  total_sold_amount: { type: Number, default: 0 },
});

export default models.Node || model<nodeTypes>("Node", nodeSchema);
