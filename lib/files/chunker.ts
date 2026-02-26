export function chunkText(text: string, maxTokens = 500): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  const overlap = 50;

  for (let i = 0; i < words.length; i += maxTokens - overlap) {
    const chunk = words.slice(i, i + maxTokens).join(" ");
    if (chunk.trim()) chunks.push(chunk.trim());
  }

  return chunks;
}
