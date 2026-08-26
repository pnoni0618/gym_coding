import path from "node:path";
import { fileURLToPath } from "node:url";
import { Octokit } from "@octokit/rest";
import { Post, readPostsInDir } from "./lib/frontmatter.js";
import { checkQuality } from "./lib/qualityGate.js";
import { loadCadence, isDueToday } from "./lib/selectDue.js";
import { formatForTistory } from "./lib/formatForTistory.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const CONTENT_DIRS: Record<string, { queue: string; published: string }> = {
  tistory: {
    queue: path.join(REPO_ROOT, "content/tistory/queue"),
    published: path.join(REPO_ROOT, "content/tistory/published"),
  },
  naver: {
    queue: path.join(REPO_ROOT, "content/naver/drafts"),
    published: path.join(REPO_ROOT, "content/naver/published"),
  },
};

function pickOldestQueued(posts: Post[]): Post | undefined {
  return posts
    .filter((p) => p.frontmatter.status === "queued")
    .sort((a, b) => (a.frontmatter.createdAt ?? "").localeCompare(b.frontmatter.createdAt ?? ""))[0];
}

function renderSection(platform: string, post: Post, content: string): string {
  const label = platform === "tistory" ? "티스토리" : "네이버";
  const relPath = path.relative(REPO_ROOT, post.filePath).replace(/\\/g, "/");
  return [
    `## ${label}: ${post.frontmatter.title}`,
    `- 파일: \`${relPath}\``,
    `- 카테고리: ${post.frontmatter.category ?? "-"} / 태그: ${(post.frontmatter.tags ?? []).join(", ")}`,
    "",
    "<details><summary>붙여넣기용 본문 펼치기</summary>",
    "",
    "```" + (platform === "tistory" ? "html" : "markdown"),
    content,
    "```",
    "",
    "</details>",
    "",
    `- [ ] 발행 완료 (발행 후 \`npx tsx mark-published.ts ${platform} ${post.frontmatter.slug} <발행된 URL>\` 실행)`,
  ].join("\n");
}

async function upsertIssue(sections: string[]): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const repoFull = process.env.GITHUB_REPOSITORY;
  const today = new Date().toISOString().slice(0, 10);
  const title = `📝 오늘 발행할 글 (${today})`;
  const body = sections.join("\n\n---\n\n");

  if (!token || !repoFull) {
    console.log("GITHUB_TOKEN/GITHUB_REPOSITORY가 없어 로컬 모드로 실행합니다. 아래 내용을 확인하세요:\n");
    console.log(`# ${title}\n\n${body}`);
    return;
  }

  const [owner, repo] = repoFull.split("/");
  const octokit = new Octokit({ auth: token });

  const existing = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "open",
    labels: "daily-publish",
  });
  const found = existing.data.find((issue) => issue.title === title);

  if (found) {
    await octokit.issues.update({ owner, repo, issue_number: found.number, body });
    console.log(`이슈 #${found.number} 갱신 완료`);
  } else {
    const created = await octokit.issues.create({
      owner,
      repo,
      title,
      body,
      labels: ["daily-publish"],
    });
    console.log(`이슈 #${created.data.number} 생성 완료`);
  }
}

async function main(): Promise<void> {
  const cadence = loadCadence(path.join(REPO_ROOT, "config/cadence.json"));
  const sections: string[] = [];

  for (const platform of Object.keys(CONTENT_DIRS)) {
    if (!isDueToday(cadence, platform)) {
      console.log(`[${platform}] 오늘은 발행일이 아닙니다`);
      continue;
    }

    const dirs = CONTENT_DIRS[platform];
    const queued = readPostsInDir(dirs.queue);
    const candidate = pickOldestQueued(queued);
    if (!candidate) {
      console.log(`[${platform}] 대기 중인 글이 없습니다`);
      continue;
    }

    const quality = checkQuality(candidate, dirs.published);
    if (!quality.passed) {
      console.log(`[${platform}] 품질 게이트 실패 (${candidate.frontmatter.slug}): ${quality.reasons.join(", ")}`);
      continue;
    }

    const content = platform === "tistory" ? formatForTistory(candidate.body) : candidate.body;
    sections.push(renderSection(platform, candidate, content));
  }

  if (sections.length === 0) {
    console.log("오늘 발행 대상 글이 없습니다. 이슈를 생성하지 않습니다.");
    return;
  }

  await upsertIssue(sections);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
