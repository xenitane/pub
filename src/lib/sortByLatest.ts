import { type CollectionEntry, type CollectionKey } from "astro:content";

export default function sortByLatest<T extends CollectionKey>(a: CollectionEntry<T>, b: CollectionEntry<T>) {
    return b.data.createdAt.valueOf() - a.data.createdAt.valueOf();
}
