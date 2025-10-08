export function formatCurrency(param) {
return (MATH.round(param / 100)).toFixed(2);
}
export default formatCurrency