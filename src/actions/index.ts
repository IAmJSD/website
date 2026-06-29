import { AtpAgent } from "@atproto/api";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
    submitContactForm: defineAction({
        input: z.object({
            category: z.enum(["work", "property"]),
            email: z.string().email(),
            message: z.string(),
            token: z.string(),
        }),
        async handler({ category, email, message, token }) {
            const categoryLabel = {
                work: "Work",
                property: "Property",
            }[category];

            // Validate the Turnstile token.
            const turnstileResponse = await fetch(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        response: token,
                        secret: process.env.TURNSTILE_SECRET!,
                    }),
                },
            );
            const turnstileData = await turnstileResponse.json();
            if (!turnstileData.success) {
                return {
                    success: false as const,
                    error: "Invalid Turnstile token",
                };
            }

            // Send the discord webhook.
            const discordResponse = await fetch(process.env.DISCORD_WEBHOOK!, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    embeds: [
                        {
                            title: "New contact form submission",
                            fields: [
                                {
                                    name: "Category",
                                    value: categoryLabel,
                                    inline: true,
                                },
                                { name: "Email", value: email, inline: true },
                                {
                                    name: "Message",
                                    value: message,
                                    inline: false,
                                },
                            ],
                        },
                    ],
                }),
            });
            if (!discordResponse.ok) {
                return {
                    success: false as const,
                    error: "Failed to send form",
                };
            }
            return { success: true as const };
        },
    }),
};
