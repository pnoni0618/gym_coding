import { Code2, Palette, Rocket, SunMoon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

const stack = [
  {
    icon: Rocket,
    title: "Next.js 15",
    description: "App Router 기반의 최신 React 프레임워크",
  },
  {
    icon: Code2,
    title: "TypeScript",
    description: "타입 안정성을 갖춘 개발 환경",
  },
  {
    icon: Palette,
    title: "TailwindCSS v4 + shadcn/ui",
    description: "빠르고 일관된 UI 스타일링",
  },
  {
    icon: SunMoon,
    title: "다크모드",
    description: "next-themes 기반 라이트/다크 테마 전환",
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-6 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Next.js Starter Kit</h1>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col gap-10">
        <section className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            웹 개발을 빠르게 시작하세요
          </h2>
          <p className="text-muted-foreground">
            Next.js, TypeScript, TailwindCSS v4, shadcn/ui가 미리 설정된
            스타터킷입니다.
          </p>
          <div className="mt-2 flex justify-center gap-3">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Next.js 문서 보기
            </a>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              shadcn/ui 문서 보기
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stack.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="mb-2 size-6 text-muted-foreground" />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>

      <footer className="text-center text-sm text-muted-foreground">
        이 페이지를 수정하려면 src/app/page.tsx 파일을 편집하세요.
      </footer>
    </div>
  );
}
