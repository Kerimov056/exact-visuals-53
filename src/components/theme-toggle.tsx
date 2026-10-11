import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let preference: string | null = null;
    try { preference = localStorage.getItem("legal-lexicon-theme"); } catch { /* Storage may be unavailable. */ }
    const enabled = preference ? preference === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  function changeTheme(enabled: boolean) {
    setDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
    try { localStorage.setItem("legal-lexicon-theme", enabled ? "dark" : "light"); } catch { /* Switching still works without storage. */ }
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Sun className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <Switch checked={dark} onCheckedChange={changeTheme} aria-label="Dark mode" />
      <Moon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
    </div>
  );
}