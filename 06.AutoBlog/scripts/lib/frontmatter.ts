import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Platform = "tistory" | "naver";
export type PostStatus = "queued" | "selected" | "published";

export interface QualityChecklist {
  hasDisclaimer?: boolean;
  hasSources?: boolean;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  platform: Platform;
  status: PostStatus;
  category?: string;
  tags?: string[];
  targetKeyword?: string;
  createdBy?: string;
  createdAt?: string;
  publishedAt?: string;
  publishedUrl?: string;
  qualityChecklist?: QualityChecklist;
}

export interface Post {
  filePath: string;
  frontmatter: PostFrontmatter;
  body: string;
}

const REQUIRED_FIELDS: (keyof PostFrontmatter)[] = ["title", "slug", "platform", "status"];

export function readPost(filePath: string): Post {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const frontmatter = parsed.data as Partial<PostFrontmatter>;

  for (const key of REQUIRED_FIELDS) {
    if (!frontmatter[key]) {
      throw new Error(`${filePath}: frontmatter에 필수 필드 "${key}"가 없습니다`);
    }
  }

  return {
    filePath,
    frontmatter: frontmatter as PostFrontmatter,
    body: parsed.content.trim(),
  };
}

export function readPostsInDir(dir: string): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPost(path.join(dir, f)));
}
