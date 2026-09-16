import { marked } from "marked";

// 티스토리 에디터에 붙여넣었을 때 스킨 기본 CSS와 무관하게 가독성 있는 간격이 항상 보장되도록
// 블록 요소에 인라인 style을 직접 주입한다. 새 태그를 추가하더라도 이 표만 갱신하면 된다.
const SPACING_STYLES: Record<string, string> = {
  h2: "margin:48px 0 24px;line-height:1.5;",
  h3: "margin:36px 0 16px;line-height:1.5;",
  p: "margin:0 0 48px;line-height:1.9;",
  ul: "margin:0 0 48px;line-height:1.9;",
  ol: "margin:0 0 48px;line-height:1.9;",
  li: "margin:0 0 8px;",
  // 인용구는 "카드"처럼 눈에 띄도록 크게, 가운데 정렬로 강조한다 (블록 요소라 자동으로 줄바꿈됨).
  blockquote: "margin:36px 0;padding:28px 24px;line-height:1.9;text-align:center;font-size:1.1em;",
  hr: "margin:48px 0;",
};

function addSpacing(html: string): string {
  return Object.entries(SPACING_STYLES).reduce(
    (result, [tag, style]) => result.replace(new RegExp(`<${tag}(?![a-zA-Z])`, "g"), `<${tag} style="${style}"`),
    html
  );
}

export function formatForTistory(markdownBody: string): string {
  const html = marked.parse(markdownBody, { async: false }) as string;
  return addSpacing(html);
}
