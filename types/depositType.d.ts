interface depositType extends documentCommon {
  userId: string;
  amount: number;
  lockPeriodEnd: string;
  profit: number;
  status: "success" | "pending" | "failed" | "rejected";

  from?: string;
  to?: string;
  user: userSchemaType;
}
