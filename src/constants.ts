import { DOMAIN_NAME } from "astro:env/client";
// for layout
export const SITE_TITLE = `Blogs | Xenitane (xenitane) | ${DOMAIN_NAME}`;

export const links = {
    forNav: {
        Home: "https://www.xenitane.xyz",
        Blogs: "https://pub.xenitane.xyz",
        Projects: "https://project.xenitane.xyz",
        Exhibit: "https://exhibit.xenitane.xyz",
        About: "https://www.xenitane.xyz/about",
    },
    footer: { github: "https://www.github.com/xenitane", email: "mailto:tushar01.tjdsk+xenitane@gmail.com" },
};
