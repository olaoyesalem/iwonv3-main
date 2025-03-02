import tronWeiToBalance from "./tronWeiToBalance";

export const tron_trc20_usdt_contract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
export const tron_trc20_usdc_contract = "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8";
export const shasta_trc20_usdt_contract = "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs";

export const tron_contracts = {
  mainnet_usdt: tron_trc20_usdt_contract,
  mainnet_usdc: tron_trc20_usdc_contract,
  shasta_usdt: shasta_trc20_usdt_contract,
};

export default function tronContractBalanceFinder(
  tronBalanceData: tronBalanceReqData,
  contract_address_name: keyof typeof tron_contracts
) {
  const trc20_contract_address = tron_contracts[contract_address_name];

  if (!tronBalanceData) return 0;

  const contract_obj = tronBalanceData?.trc20?.find(
    (c) => c[trc20_contract_address]
  );

  if (!contract_obj) return 0;

  const wei_value = contract_obj[trc20_contract_address];

  return tronWeiToBalance(wei_value);
}
