import mdx, { type MdxOptions } from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import type { AstroUserConfig } from "astro";
import compressor from "astro-compressor";
import { defineConfig, envField } from "astro/config";
import rehypeMathjax from "rehype-mathjax/chtml";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

const markdownConfig = {
    rehypePlugins: [
        [
            rehypeMathjax,
            {
                chtml: {
                    fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
                },
            },
        ],
        [rehypePrettyCode, { theme: { light: "catppuccin-latte", dark: "catppuccin-mocha" } }],
        function () {
            return function (tree: any) {
                async function copy(e: any) {
                    e.preventDefault();
                    const el = e.currentTarget;
                    const value = el.previousElementSibling.innerText;
                    const originalText = el.innerText;
                    el.disabled = true;
                    setTimeout(() => {
                        el.innerText = originalText;
                        el.disabled = false;
                    }, 3000);
                    await navigator.clipboard.writeText(value);
                    el.innerText = "copied!";
                }

                function visitor(node: any) {
                    if (
                        !(
                            "data-rehype-pretty-code-figure" in (node.properties ?? []) &&
                            ["pre", "figcaption"].includes(node.children[0]?.tagName)
                        )
                    ) {
                        return;
                    }
                    node.children.push({
                        type: "element",
                        tagName: "button",
                        properties: {
                            "data-copy": true,
                            onClick: `${copy.toString().replace(/\s+/g, " ")}; copy(arguments[0])`,
                        },
                        children: [{ type: "text", value: "copy" }],
                    });
                }
                visit(tree, "element", visitor);
            };
        },
    ],
    remarkPlugins: [remarkMath],
    syntaxHighlight: false,
};

export default defineConfig({
    build: { assets: "assets", format: "file" },
    devToolbar: { enabled: false },
    env: {
        schema: {
            SITE_URL: envField.string({
                context: "client",
                access: "public",
                optional: false,
                url: true,
            }),
            CDN_URL: envField.string({
                context: "client",
                access: "public",
                optional: false,
                url: true,
            }),
            DOMAIN_NAME: envField.string({
                context: "client",
                access: "public",
                optional: false,
            }),
        },
    },
    integrations: [sitemap(), mdx(markdownConfig as Partial<MdxOptions>), compressor()],
    markdown: markdownConfig as AstroUserConfig["markdown"],
    output: "static",
    server({ command }) {
        return {
            host: "0.0.0.0",
            port: 4173 + (command === "dev" ? 1000 : 0),
        };
    },
    site: "https://pub.xenitane.xyz",
    trailingSlash: "never",
    vite: { plugins: [tailwindcss()] },
});
