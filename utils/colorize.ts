const R = "\x1b[0m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";

function colorValue(value: unknown, depth: number): string {
  const pad = "  ".repeat(depth);
  const padInner = "  ".repeat(depth + 1);

  if (value === null) return `${BLUE}null${R}`;
  if (typeof value === "boolean") return `${BLUE}${value}${R}`;
  if (typeof value === "number") return `${YELLOW}${value}${R}`;
  if (typeof value === "string") return `${GREEN}"${value}"${R}`;

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => `${padInner}${colorValue(v, depth + 1)}`);
    return `[\n${items.join(",\n")}\n${pad}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const items = entries.map(
      ([k, v]) =>
        `${padInner}${CYAN}"${k}"${R}: ${colorValue(v, depth + 1)}`,
    );
    return `{\n${items.join(",\n")}\n${pad}}`;
  }

  return String(value);
}

export function colorizeJSON(value: unknown): string {
  return colorValue(value, 0);
}

export function colorizeAndFormat(value: unknown): string {
  return colorizeJSON(value).replace(/\n/g, "\r\n") + "\r\n";
}
