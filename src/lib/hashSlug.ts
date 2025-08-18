import { hash } from "crypto";

export default function hashSlug(slug: string): string {
    return hash("sha256", slug, "hex").slice(0, 8) + "-" + slug;
}
