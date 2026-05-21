/**
 * Minimal CSV parser that handles quoted fields with commas, escaped quotes ("")
 * and CR/LF line endings. Trims surrounding whitespace on the input.
 */
export function parseCsv(input: string): string[][] {
  const text = input.replace(/\r\n?/g, "\n").trim();
  if (!text) return [];

  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\t" && row.length === 0 && field === "") {
      // allow tab-separated paste from Google Sheets
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch === "\t") {
      row.push(field);
      field = "";
    } else {
      field += ch;
    }
  }
  row.push(field);
  if (row.length > 1 || row[0] !== "") rows.push(row);

  return rows;
}

export function csvToTableData(input: string): { headers: string[]; rows: string[][] } | null {
  const parsed = parseCsv(input);
  if (parsed.length < 1) return null;
  const [headers, ...rows] = parsed;
  return {
    headers: headers.map((h) => h.trim()),
    rows: rows.filter((r) => r.some((c) => c.trim() !== "")),
  };
}
