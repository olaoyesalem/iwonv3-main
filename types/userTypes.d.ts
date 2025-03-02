declare interface userSchemaType extends documentCommon {
  email: string;
  username: string;
  fullname: string;
  password: string;
  refUsername: string;
  wallet: {
    tron: {
      mnemonic: string;
      xpub: string;
      key: string;
      address: string;
    };
    evm: {
      mnemonic: string;
      xpub: string;
      key: string;
      address: string;
    };
  };

  role: "admin" | "user";
  manager: "yes" | "no";
  status: "blocked" | "active";
  pin?: string;

  investBalance: number;
  profitBalance: number;

  autoReInvest: "off" | "always" | "date";
  autoReInvestDate: string;
  note_message: string;

  // optionals
  accountBalance: number;
  loanBalance: number;
  investProfitBalance: number;
  investWithdrawableBalance: number;

  avatar?: {
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

  emailVerified?: boolean;
  recoveryCode?: string;
  recoveryCodeExpiry?: any;
  dateOfBirth?: string;
  address?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  accountVerified?: boolean;

  accountVerifiedDocument?: {
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
}
