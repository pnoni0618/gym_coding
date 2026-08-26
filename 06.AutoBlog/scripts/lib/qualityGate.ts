import { Post, readPostsInDir } from "./frontmatter.js";

// 한국어 콘텐츠는 공백 기준 어절수가 아니라 글자수(공백 포함)로 분량을 재는 것이 관례입니다.
// 1,500자는 네이버/구글에서 통상 권장되는 최소 분량 기준입니다.
const MIN_CHAR_COUNT = 1500;
const DISCLAIMER_HINTS = [
  "정보 제공 목적",
  "법률·세무 자문이 아닙니다",
  "법률 자문이 아닙니다",
  "전문가와 상담",
];

export interface QualityResult {
  passed: boolean;
  reasons: string[];
}

function countChars(text: string): number {
  return text.length;
}

export function checkQuality(post: Post, publishedDir: string): QualityResult {
  const reasons: string[] = [];
  const { frontmatter, body } = post;

  const charCount = countChars(body);
  if (charCount < MIN_CHAR_COUNT) {
    reasons.push(`본문이 너무 짧습니다 (${charCount}자 < 최소 ${MIN_CHAR_COUNT}자)`);
  }

  const hasDisclaimerText = DISCLAIMER_HINTS.some((hint) => body.includes(hint));
  if (!frontmatter.qualityChecklist?.hasDisclaimer && !hasDisclaimerText) {
    reasons.push("면책 안내 문구가 없습니다 (근로기준법/세무 등 YMYL 인접 주제는 필수)");
  }

  if (!frontmatter.category) {
    reasons.push("category가 없습니다");
  }
  if (!frontmatter.tags || frontmatter.tags.length === 0) {
    reasons.push("tags가 없습니다");
  }

  const published = readPostsInDir(publishedDir);
  const isDuplicate = published.some(
    (p) => p.frontmatter.slug === frontmatter.slug || p.frontmatter.title === frontmatter.title
  );
  if (isDuplicate) {
    reasons.push(`이미 발행된 글과 slug/title이 중복됩니다: ${frontmatter.slug}`);
  }

  return { passed: reasons.length === 0, reasons };
}
