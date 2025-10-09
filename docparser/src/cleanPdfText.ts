// Best default for LLMs: compact but safe
export function cleanPdfText(
  input: string,
  opts: { preserveColumns?: boolean; dropPageHeaders?: boolean } = {}
): string {
  const { preserveColumns = false, dropPageHeaders = true } = opts;

  let t = input
    // normalize unicode spaces → regular space
    .replace(/\u00A0|\u202F|\u2007|[\u2000-\u200A]|\u205F|\u3000/g, " ")
    // normalize newlines
    .replace(/\r\n?/g, "\n")
    // remove form feeds
    .replace(/\f+/g, "\n");

  // remove "---- PAGE N ----" banners
  if (dropPageHeaders) {
    t = t.replace(/^-{2,}\s*PAGE\s+\d+\s*-{2,}\s*$/gim, "");
  }

  const lines = t.split("\n").map((line) => {
    if (preserveColumns) {
      // keep internal spacing; just trim right edge
      return line.replace(/[ \t]+$/g, "");
    }
    // compact: remove left indent and collapse 2+ spaces to 1
    return line.replace(/[ \t]{2,}/g, " ").trim();
  });

  // collapse 3+ newlines to max 2; then trim file
  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
