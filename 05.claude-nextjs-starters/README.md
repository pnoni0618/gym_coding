# Next.js 스타터킷

Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, lucide-react로 구성된 모던 웹 개발 스타터킷입니다. 별도 설정 없이 바로 기능 개발을 시작할 수 있습니다.

## 기술 스택

- **[Next.js](https://nextjs.org)** 16 (App Router)
- **[React](https://react.dev)** 19
- **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind CSS](https://tailwindcss.com)** v4
- **[shadcn/ui](https://ui.shadcn.com)** ([Base UI](https://base-ui.com) 기반, `base-nova` 스타일)
- **[lucide-react](https://lucide.dev)** — 아이콘

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인합니다. `app/page.tsx`를 수정하면 자동으로 반영됩니다.

## 프로젝트 구조

```
app/                루트 레이아웃, 페이지, 전역 스타일 (App Router)
components/ui/       shadcn/ui 컴포넌트
components/          프로젝트 전용 컴포넌트 (예: theme-toggle)
lib/utils.ts          cn() 유틸리티 (clsx + tailwind-merge)
```

## shadcn/ui 컴포넌트 추가하기

```bash
npx shadcn@latest add <컴포넌트명>
```

예: `npx shadcn@latest add accordion`

## 명령어

```bash
npm run dev     # 개발 서버 실행
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버 실행
npm run lint    # ESLint 검사
```
