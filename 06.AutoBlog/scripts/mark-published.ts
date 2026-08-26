import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const [, , platform, slug, publishedUrl] = process.argv;

if (!platform || !slug) {
  console.error("사용법: npx tsx mark-published.ts <tistory|naver> <slug> [publishedUrl]");
  process.exit(1);
}

const DIRS: Record<string, { queue: string; published: string }> = {
  tistory: {
    queue: path.join(REPO_ROOT, "content/tistory/queue"),
    published: path.join(REPO_ROOT, "content/tistory/published"),
  },
  naver: {
    queue: path.join(REPO_ROOT, "content/naver/drafts"),
    published: path.join(REPO_ROOT, "content/naver/published"),
  },
};

const dir = DIRS[platform];
if (!dir) {
  console.error(`알 수 없는 platform: ${platform} (tistory 또는 naver만 가능)`);
  process.exit(1);
}

const files = fs.readdirSync(dir.queue).filter((f) => f.endsWith(".md"));
const target = files.find((f) => {
  const parsed = matter(fs.readFileSync(path.join(dir.queue, f), "utf-8"));
  return parsed.data.slug === slug;
});

if (!target) {
  console.error(`큐에서 slug "${slug}"를 찾을 수 없습니다`);
  process.exit(1);
}

const srcPath = path.join(dir.queue, target);
const parsed = matter(fs.readFileSync(srcPath, "utf-8"));
parsed.data.status = "published";
parsed.data.publishedAt = new Date().toISOString().slice(0, 10);
if (publishedUrl) parsed.data.publishedUrl = publishedUrl;

fs.writeFileSync(srcPath, matter.stringify(parsed.content, parsed.data));
fs.mkdirSync(dir.published, { recursive: true });
fs.renameSync(srcPath, path.join(dir.published, target));

console.log(`발행 완료 처리: ${path.join(dir.published, target)}`);
