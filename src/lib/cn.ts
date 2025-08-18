import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...cls: ClassValue[]) {
    return twMerge(clsx(cls));
}
