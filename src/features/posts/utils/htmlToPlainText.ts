function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

/**
 * Converte o conteúdo do post em texto editável no formulário.
 * Diferente de `htmlToPlainText`, preserva as quebras de linha dos blocos.
 * Posts criados pelo app já são texto puro e voltam sem alteração.
 */
export function htmlToEditableText(html?: string | null): string {
  if (!html) return "";
  if (!/<[a-z][^>]*>/i.test(html)) return html;

  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|h[1-6]|blockquote)>/gi, "\n")
      .replace(/<[^>]*>/g, ""),
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

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
