import { HomeIcon } from "lucide-react";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { Icons } from "@/components/icons";

/** Small icon set used by the dock navbar island. Keyed by `DATA` icon strings. */
export const navIcons = {
  home: HomeIcon,
  github: Icons.github,
  linkedin: Icons.linkedin,
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  email: Icons.email,
} as const;

export type NavIconKey = keyof typeof navIcons;
