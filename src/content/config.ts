import { defineCollection, z } from "astro:content";

const publication = defineCollection({
    type: "content",
    schema: z.object({
        isDraft: z.boolean(),
        metaContent: z.object({
            title: z.string(),
            description: z.string(),
            keywords: z.string().array(),
            heroImage: z.tuple([z.boolean(), z.string()]),
        }),
        createdAt: z.coerce.date(),
    }),
});

export const collections = { publication };
