import { ANSI } from "@/constants/ansi";

function colorValue(value: unknown, depth: number): string {
  const pad = "  ".repeat(depth);
  const padInner = "  ".repeat(depth + 1);

  if (value === null) return `${ANSI.BLUE}null${ANSI.RESET}`;
  if (typeof value === "boolean") return `${ANSI.BLUE}${value}${ANSI.RESET}`;
  if (typeof value === "number") return `${ANSI.YELLOW}${value}${ANSI.RESET}`;
  if (typeof value === "string") return `${ANSI.GREEN}"${value}"${ANSI.RESET}`;

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
        `${padInner}${ANSI.CYAN}"${k}"${ANSI.RESET}: ${colorValue(v, depth + 1)}`,
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
