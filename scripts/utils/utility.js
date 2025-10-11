export function formatCurrency(param) {
return (Math.round(param) / 100).toFixed(2);
}
export default formatCurrency