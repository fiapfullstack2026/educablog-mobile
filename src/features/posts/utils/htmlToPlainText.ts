/**
 * Extrai o texto puro de uma string HTML (usado para o resumo do card).
 * O `content` do post é salvo como HTML pelo editor do web (BlockNote).
 */
export function htmlToPlainText(html?: string | null): string {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
