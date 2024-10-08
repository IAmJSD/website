import rss from "@astrojs/rss";
import { url } from "../info";

const blogPosts = import.meta.glob("./blog/*.md");

export async function GET() {
    return rss({
        title: "Astrid's Blog",
        description: "A blog about my life and thoughts on tech",
        site: url,
        items: await Promise.all(
            Object.entries(blogPosts).map(async ([path, postPromise]) => {
                const post = await postPromise();
                return {
                    title: post.frontmatter.title,
                    description: post.frontmatter.description,
                    pubDate: post.frontmatter.date,
                    link: path
                        .replace(/\.md$/, "")
                        .replace(/^\.\/blog\//, "/blog/"),
                };
            }),
        ),
        customData: "<language>en-GB</language>",
    });
}
