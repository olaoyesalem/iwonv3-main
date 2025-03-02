export default function getPercentage(total?: number, percentage?: number) {
  if (!total || !percentage) return 0;
  return (total / 100) * percentage;
}
