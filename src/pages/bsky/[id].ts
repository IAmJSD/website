import { AtpAgent } from "@atproto/api";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const did = process.env.BLUESKY_DID!;
    const identifier = process.env.BLUESKY_IDENTIFIER!;
    const token = process.env.BLUESKY_TOKEN!;
    if (!did || !identifier || !token) {
        throw new Error("Missing Bluesky credentials");
    }

    const agent = new AtpAgent({ service: "https://bsky.social" });
    await agent.login({ identifier, password: token });
    let post: Awaited<ReturnType<typeof agent.getPostThread>>;
    const id = params.id!;
    try {
        post = await agent.getPostThread({ uri: `at://${did}/app.bsky.feed.post/${encodeURIComponent(id)}` });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to get post" }), { status: 500 });
    }
    return new Response(JSON.stringify(post.data.thread), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60",
        },
        status: 200,
    });
};
