import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";

/**
 * Toggles the `.dark` class on <html> and persists the choice.
 * The initial class is applied by an inline script in BaseLayout before paint.
 */
export function ModeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // Storage may be unavailable (private mode); the class toggle still works.
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center rounded-full text-current",
        className
      )}
    >
      <SunIcon className="h-full w-full dark:hidden" aria-hidden />
      <MoonIcon className="hidden h-full w-full dark:block" aria-hidden />
    </button>
  );
}
