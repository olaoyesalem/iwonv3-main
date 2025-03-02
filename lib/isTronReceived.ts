export default function isTronReceived(
  trx: tronTransaction,
  user_wallet_address: string
) {
  return trx.to === user_wallet_address;
}
