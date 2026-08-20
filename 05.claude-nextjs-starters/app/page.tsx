import {
  ArrowRight,
  Code,
  Layout,
  Menu,
  Package,
  Palette,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";

const techStack = ["Next.js 16", "TypeScript", "Tailwind CSS", "shadcn/ui", "lucide-react"];

const features = [
  {
    icon: Zap,
    title: "App Router",
    description: "Next.js 최신 App Router 기반으로 빠르게 페이지를 구성할 수 있습니다.",
  },
  {
    icon: Palette,
    title: "Tailwind CSS v4",
    description: "CSS 기반 설정과 디자인 토큰으로 일관된 스타일링이 가능합니다.",
  },
  {
    icon: Code,
    title: "TypeScript",
    description: "엄격한 타입 검사로 안전하고 예측 가능한 코드를 작성할 수 있습니다.",
  },
  {
    icon: Package,
    title: "shadcn/ui",
    description: "복사해서 바로 쓰는 컴포넌트로 UI 개발 속도를 높여줍니다.",
  },
  {
    icon: Layout,
    title: "재사용 가능한 레이아웃",
    description: "헤더, 카드, 탭 등 자주 쓰는 레이아웃 패턴을 기본 제공합니다.",
  },
  {
    icon: Sparkles,
    title: "다크모드",
    description: "라이트/다크 테마를 전환할 수 있는 토글이 내장되어 있습니다.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-semibold">
            <Rocket className="size-5" />
            <span>Starter Kit</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>소개</DropdownMenuItem>
                <DropdownMenuItem>기능</DropdownMenuItem>
                <DropdownMenuItem>컴포넌트</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-6 py-16">
        {/* 히어로 섹션 */}
        <section className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary">Next.js 16 · React 19 · Tailwind v4</Badge>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            바로 개발을 시작할 수 있는 모던 웹 스타터킷
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Next.js, TypeScript, Tailwind CSS, shadcn/ui, lucide-react가 미리 설정되어 있어
            추가 세팅 없이 바로 기능 개발에 집중할 수 있습니다.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg">
              시작하기
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline">
              문서 보기
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* 기능 카드 그리드 */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="mb-2 size-5 text-primary" />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        {/* 컴포넌트 쇼케이스 */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">컴포넌트 쇼케이스</h2>
            <p className="text-muted-foreground">설치된 shadcn/ui 컴포넌트를 미리 확인해보세요.</p>
          </div>
          <Tabs defaultValue="form">
            <TabsList>
              <TabsTrigger value="form">폼</TabsTrigger>
              <TabsTrigger value="overlay">다이얼로그 &amp; 툴팁</TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <Card>
                <CardHeader>
                  <CardTitle>빠른 시작</CardTitle>
                  <CardDescription>Input, Textarea, Label 컴포넌트 예시입니다.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" placeholder="홍길동" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message">메시지</Label>
                    <Textarea id="message" placeholder="문의 내용을 입력하세요" />
                  </div>
                  <Button className="self-start">제출</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="overlay">
              <Card>
                <CardHeader>
                  <CardTitle>다이얼로그 · 툴팁 · 아바타</CardTitle>
                  <CardDescription>Dialog, Tooltip, Avatar 컴포넌트 예시입니다.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-4">
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" />}>
                      다이얼로그 열기
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>스타터킷 안내</DialogTitle>
                        <DialogDescription>
                          이 다이얼로그는 shadcn/ui Dialog 컴포넌트로 만들어졌습니다.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter showCloseButton />
                    </DialogContent>
                  </Dialog>

                  <Tooltip>
                    <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
                      <Sparkles />
                    </TooltipTrigger>
                    <TooltipContent>lucide-react 아이콘 + 툴팁</TooltipContent>
                  </Tooltip>

                  <Avatar>
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* 푸터 */}
      <footer>
        <Separator />
        <div className="mx-auto w-full max-w-5xl px-6 py-6 text-center text-sm text-muted-foreground">
          Made with shadcn/ui + lucide-react
        </div>
      </footer>
    </div>
  );
}
