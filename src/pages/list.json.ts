import hashSlug from "@/lib/hashSlug";
import sortByLatest from "@/lib/sortByLatest";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async function () {
    return new Response(
        JSON.stringify(
            (
                await getCollection("publication", function (pub) {
                    return import.meta.env.DEV || !pub.data.isDraft;
                })
            )
                .sort(sortByLatest)
                .map(function ({
                    slug,
                    data: {
                        metaContent: { title },
                    },
                }) {
                    return { href: hashSlug(slug), title: title };
                })
        ),
        { headers: { "Content-Type": "text/json" } }
    );
};
