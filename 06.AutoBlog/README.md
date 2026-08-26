# AutoBlog — 블로그 발행 큐 & 알림 시스템

티스토리("생생꿀정보통")와 네이버 블로그의 꾸준한 발행을 위한 콘텐츠 큐 + GitHub Actions 알림 시스템입니다.

## 왜 "완전 자동 게시"가 아닌가

티스토리 Open API(글쓰기 포함)는 2023년 말~2024년 초 카카오에 의해 완전히 서비스 종료되었고,
네이버 블로그도 외부 글쓰기 API를 제공하지 않습니다. 따라서 두 플랫폼 모두 API를 통한 자동 게시가
현재 불가능합니다. 브라우저 자동화(RPA)는 계정 정지·저품질 판정 위험이 있어 기본안에서 제외했습니다.

대신 이 시스템은 **"꾸준한 집필 → 품질 체크 → 발행 리마인드"를 자동화**하고, 실제 발행(붙여넣기+클릭)만
사람이 하도록 설계되었습니다.

## 동작 방식

1. Claude Code와의 대화에서 글을 써서 `content/tistory/queue/` 또는 `content/naver/drafts/`에
   frontmatter가 포함된 마크다운 파일로 저장합니다 (형식은 아래 예시 참고).
2. GitHub Actions가 `config/cadence.json`에 정의된 요일마다 자동 실행되어, 대기 중인 글 중 가장 오래된
   글 1개(플랫폼별)를 골라 품질 게이트를 통과시킨 뒤 붙여넣기용 콘텐츠(HTML/마크다운)를 GitHub 이슈로
   올립니다.
3. 사람이 이슈 내용을 복사해 실제 에디터에 붙여넣고 발행합니다.
4. 발행 후 `cd scripts && npx tsx mark-published.ts <tistory|naver> <slug> <발행된 URL>`을 실행해
   해당 글을 `published/` 폴더로 옮기고 frontmatter를 갱신합니다.

## 새 글 추가하기

`content/tistory/queue/YYYY-MM-DD-slug.md` 형식으로 파일을 만들고, 상단에 다음 frontmatter를 채웁니다.

```yaml
---
title: "글 제목"
slug: unique-slug
platform: tistory        # tistory | naver
status: queued
category: "카테고리"
tags: [태그1, 태그2]
targetKeyword: "타겟 키워드"
createdBy: claude-code-manual
createdAt: YYYY-MM-DD
qualityChecklist:
  hasDisclaimer: true
  hasSources: true
---
```

주제 아이디어는 `content/tistory/ideas.md`를 참고하세요.

## 로컬 실행

```bash
cd scripts
npm install
npx tsx select-and-notify.ts   # GITHUB_TOKEN 없으면 콘솔에 결과만 출력 (로컬 확인용)
```

## 발행 케이던스

`config/cadence.json`에서 조정합니다. 기본값은 티스토리 주 4회(월/수/금/일), 네이버 주 2회(화/토)입니다.
근로기준법/퇴직금 같은 YMYL 인접 주제 특성상, 볼륨보다 품질과 케이던스 분산을 우선합니다.

## 다음 단계 (2단계 이후)

첫 달 수익이 확인되면 `scripts/generate-draft.ts`(Claude API 연동)와 주간 워크플로를 추가해
초안 생성 자체도 자동화할 수 있습니다. 큐 포맷/품질게이트/알림 워크플로는 그대로 재사용됩니다.
