export function formatCurrencyIDR(amount: number) {
  if (isNaN(amount)) {
    return "Invalid amount";
  }

  // Memformat angka menjadi string dengan pemisah ribuan dan tanpa desimal
  let formattedAmount = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return "Rp " + formattedAmount;
}
