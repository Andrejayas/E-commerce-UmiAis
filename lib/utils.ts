/**
 * Generates a unique order number in the format ORD-YYYYMMDD-XXXX
 * where XXXX is a random 4-digit number.
 * Example: ORD-20260822-4821
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const date = now
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${date}-${random}`;
}

/**
 * Formats a number as Indonesian Rupiah currency.
 * Example: 25000 → "Rp 25.000"
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Converts a product name into a URL-friendly slug.
 * Example: "Roti Tawar Spesial" → "roti-tawar-spesial"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncates a string to a given length, appending "..." if truncated.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}
