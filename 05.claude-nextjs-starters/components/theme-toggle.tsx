"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Switch } from "@/components/ui/switch"

// 로컬 스토리지에 저장하는 테마 값의 키
const THEME_STORAGE_KEY = "theme"

// 서버에서는 window에 접근할 수 없으므로 항상 라이트 모드를 기본값으로 사용한다
function getInitialIsDark() {
  if (typeof window === "undefined") return false
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored) return stored === "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialIsDark)

  // React 상태(isDark)를 DOM 클래스와 로컬 스토리지에 동기화한다
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light")
  }, [isDark])

  return (
    <label className="flex items-center gap-2">
      <Sun className="size-4 text-muted-foreground" />
      <Switch checked={isDark} onCheckedChange={setIsDark} aria-label="다크모드 전환" />
      <Moon className="size-4 text-muted-foreground" />
    </label>
  )
}
