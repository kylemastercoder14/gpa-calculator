"use client"

import * as React from "react"

import { useTheme } from "next-themes"
import { Switch } from "./ui/switch"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("light")
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Switch id="theme-mode" checked={theme === "dark"}
        onCheckedChange={toggleTheme} />
      <label htmlFor="theme-mode">
      <span className="sr-only">Toggle Theme</span>
        {theme === "dark" ? (
          <p>Dark Mode</p>
        ) : (
          <p>Light Mode</p>
        )}
      </label>
    </div>
  )
}
