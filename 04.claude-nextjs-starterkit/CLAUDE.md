# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code(claude.ai/code)에게 제공되는 가이드입니다.

@AGENTS.md

## 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 빌드 실행
npm run lint     # eslint (flat config, next/core-web-vitals + next/typescript)
```

이 저장소에는 테스트 러너가 설정되어 있지 않습니다 (test 스크립트, jest/vitest 설정 없음).

shadcn/ui 컴포넌트 추가: `npx shadcn add <component>` — `components.json` 설정을 읽어 `src/components/ui/`에 파일을 생성합니다.

## 아키텍처

최소 구성의 Next.js 15 App Router 스타터킷입니다 — 단일 라우트(`src/app/page.tsx`)와 공통 프로바이더/UI로 구성됩니다. 스택: TypeScript, TailwindCSS v4, shadcn/ui, lucide-react, next-themes.

- `src/app/layout.tsx` — 루트 레이아웃. `ThemeProvider`(`attribute="class"`, `defaultTheme="system"`)로 앱을 감싸고, Geist 폰트를 CSS 변수로 로드합니다. `<html>`에 `lang="ko"`가 설정되어 있습니다.
- `src/components/theme-provider.tsx` / `theme-toggle.tsx` — next-themes 연동. `ThemeToggle`은 실제 아이콘을 렌더링하기 전에 `mounted` 상태로 하이드레이션 불일치를 방지합니다.
- `src/components/ui/` — shadcn/ui 컴포넌트 (현재 `button.tsx`, `card.tsx`).
- `src/lib/utils.ts` — `cn()` 헬퍼 (clsx + tailwind-merge).
- 경로 별칭 `@/*` → `src/*` (`tsconfig.json` 참고).

**shadcn/ui 설정이 기본값과 다릅니다** (`components.json`): 스타일 `base-nova`, 베이스 컬러 `neutral`, 아이콘 라이브러리 `lucide`. 프리미티브는 흔히 쓰이는 `radix-ui`/`@radix-ui/react-*`가 아니라 `@base-ui/react`에서 가져옵니다 (예: `src/components/ui/button.tsx`는 `Button as ButtonPrimitive from "@base-ui/react/button"`을 import). `ui/` 컴포넌트를 추가/수정할 때 Radix API를 가정하지 마세요.

**TailwindCSS v4 — `tailwind.config.*` 파일이 없습니다.** 테마는 전부 `src/app/globals.css`에서 `@import "tailwindcss"`, `@theme inline { ... }`, CSS 커스텀 속성(`:root` / `.dark`, OKLCH 색상)으로 구성됩니다. `@import "shadcn/tailwind.css"`로 shadcn 프리셋을 가져옵니다. 테마 토큰(색상, radius, sidebar/chart 팔레트)을 변경하려면 별도 config 파일을 찾지 말고 `globals.css`를 직접 수정하세요.

## AGENTS.md의 규칙

`AGENTS.md`는 `next dev`가 자동으로 재생성하는 파일이며 (`node_modules/next/dist/server/lib/generate-agent-files.js` 참고), 이 Next.js 버전이 학습 데이터와 다를 수 있다고 경고합니다 — 기억에 의존해 API를 사용하기 전에 `node_modules/next/dist/docs/`를 확인하세요. `next dev`가 이 파일을 diff에 다시 추가하면 그대로 커밋하세요.
