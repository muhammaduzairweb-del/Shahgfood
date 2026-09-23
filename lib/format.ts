/** Price label, e.g. 1800 → "Rs. 1,800". */
export function fmt(n: number): string {
  return "Rs. " + n.toLocaleString("en-US");
}

/** Two-letter monogram used when a dish has no photo, e.g. "Daal Chawal" → "DC". */
export function mono(name: string): string {
  const w = name.replace(/[()]/g, "").trim().split(/\s+/);
  return ((w[0] || "")[0] || "") + ((w[1] || "")[0] || "");
}
