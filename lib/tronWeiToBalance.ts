export default function tronWeiToBalance(wei?: number) {
  if (!wei) return 0;
  if (isNaN(wei)) return 0;

  return wei / 1e6;
}
