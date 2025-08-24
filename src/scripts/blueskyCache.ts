import type { ThreadViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

const threads: Map<string, Promise<ThreadViewPost>> = new Map();

async function getThreadFromAPI(id: string) {
    const response = await fetch(`/bsky/${encodeURIComponent(id)}`);
    if (!response.ok) {
        throw new Error("Failed to get thread from API");
    }
    const thread = await response.json() as ThreadViewPost;
    return thread;
}

export async function getThread(uri: string) {
    const r = threads.get(uri);
    if (r) return r;

    const id = uri.split("/").pop()!;

    const thread = getThreadFromAPI(id).then((r) => {
        if (r.$type !== "app.bsky.feed.defs#threadViewPost") {
            throw new Error("Thread is not a thread view post");
        }
        return r as ThreadViewPost;
    });
    threads.set(uri, thread);
    return thread;
}
