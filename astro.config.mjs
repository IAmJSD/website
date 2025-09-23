// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import rehypeSemanticImages from "@benjc/rehype-semantic-images";

// https://astro.build/config
export default defineConfig({
    output: "static",
    integrations: [tailwind()],
    adapter: cloudflare(),
    prefetch: {
        prefetchAll: true,
    },
    markdown: {
        rehypePlugins: [
            () => {
                /** @ts-ignore */
                return rehypeSemanticImages({
                    elements: {
                        figure: { className: "w-full text-center" },
                        figcaption: { className: "text-black dark:text-white" },
                        img: { className: "mx-auto" },
                    },
                });
            },
        ],
    },
});
