import mongoose, { Schema, model, Document } from "mongoose";

interface userSchemaType extends Document {
  email: string;
  username: string;
  fullname: string;
  password: string;
  refUsername?: string;
  wallet: {
    tron: {
      mnemonic?: string;
      xpub?: string;
      key?: string;
      address?: string;
    };
    evm: {
      mnemonic?: string;
      xpub?: string;
      key?: string;
      address?: string;
    };
  };
  connectedWallets?: string[]; // To store external wallet addresses used for authentication
  pin?: string;
  role: "admin" | "user";
  manager: "yes" | "no";
  status: string;
  investBalance: number;
  profitBalance: number;
  autoReInvest: "off" | "always" | "date";
  autoReInvestDate?: string;
  note_message?: string;
  accountBalance: number;
  loanBalance: number;
  investProfitBalance: number;
  investWithdrawableBalance: number;
  avatar?: {
    url?: string;
    public_id?: string;
    secure_url?: string;
    format?: string;
    width?: number;
    height?: number;
    bytes?: number;
    original_filename?: string;
    created_at?: string;
    etag?: string;
    thumbnail_url?: string;
  };
  emailVerified: boolean;
  dateOfBirth?: string;
  address?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  accountVerified: boolean;
  accountVerifiedDocument?: {
    url?: string;
    public_id?: string;
    secure_url?: string;
    format?: string;
    width?: number;
    height?: number;
    bytes?: number;
    original_filename?: string;
    created_at?: string;
    etag?: string;
    thumbnail_url?: string;
  };
  recoveryCode?: string;
  recoveryCodeExpiry?: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<userSchemaType>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    fullname: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    refUsername: { type: String, trim: true, lowercase: true },
    wallet: {
      tron: {
        mnemonic: { type: String },
        xpub: { type: String },
        key: { type: String },
        address: { type: String },
      },
      evm: {
        mnemonic: { type: String },
        xpub: { type: String },
        key: { type: String },
        address: { type: String },
      },
    },
    // New field for storing external wallet addresses used for authentication
    connectedWallets: {
      type: [String],
      default: [],
    },
    pin: { type: String, trim: true, required: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    manager: { type: String, enum: ["yes", "no"], default: "no" },
    status: { type: String, default: "active" },
    investBalance: { type: Number, default: 0 },
    profitBalance: { type: Number, default: 0 },
    
    autoReInvest: {
      type: String,
      enum: ["off", "always", "date"],
    },
    
    autoReInvestDate: {
      type: String,
    },
    note_message: {
      type: String,
    },
    
    // optionals
    accountBalance: { type: Number, default: 0 },
    loanBalance: { type: Number, default: 0 },
    investProfitBalance: { type: Number, default: 0 },
    investWithdrawableBalance: { type: Number, default: 0 },
    
    avatar: {
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
    
    emailVerified: { type: Boolean, default: false },
    dateOfBirth: { type: String, trim: true },
    address: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    accountVerified: { type: Boolean, default: false },
    accountVerifiedDocument: {
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
    recoveryCode: { type: String },
    recoveryCodeExpiry: { type: Number },
  },
  { timestamps: true }
);

// Maintain existing indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

// Add index for wallet addresses to speed up wallet-based authentication
userSchema.index({ "wallet.evm.address": 1 });
userSchema.index({ "wallet.tron.address": 1 });
userSchema.index({ connectedWallets: 1 });

export default mongoose.models.User ||
  model<userSchemaType>("User", userSchema);