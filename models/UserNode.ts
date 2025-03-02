import { model, models, Schema, Types } from "mongoose";

const userNodeSchema = new Schema<userNodeTypes>({
  userId: { type: Types.ObjectId, ref: "User" },
  nodeId: { type: Types.ObjectId, ref: "Node" },
  seats_purchased: { type: Number },
  price: { type: Number },
  totalCost: { type: Number },
  purchaseCalculatedData: { type: Object },
  blockchain: {
    txID: { type: String },
    fromWallet: { type: String },
    toWallet: { type: String },
    currency: { type: String },
  },
});

export default models.UserNode ||
  model<userNodeTypes>("UserNode", userNodeSchema);
