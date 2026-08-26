import { marked } from "marked";

export function formatForTistory(markdownBody: string): string {
  return marked.parse(markdownBody, { async: false }) as string;
}
