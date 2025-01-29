---
layout: ../../layouts/BlogPostLayout.astro
title: "Bun 1.2: Using and benchmarking the new Postgres client"
description: "Bun 1.2 has been released, and it comes with a new Postgres client. I've been testing it out and it's pretty cool!"
---

**Legal disclosure:** Neon commissioned me to develop the following testing tools and blog post.

Bun 1.2 was recently released, and alongside all of the new functionality (the JSON lock files, GC cleanup function, better node compatibility, etc.) it also comes with a new Postgres client built into the engine. 

## Usage

After upgrading to Bun 1.2, you can use the `sql` function on the `Bun` global object to run queries or you can import it from `bun` (preferred for future Node compatibility reasons):

```ts
import { sql } from "bun";
```

Usage is pretty straightforward, after we set the `CONNECTION_URL` environment variable (or create a client with the `SQL` constructor), we can run queries:

```ts
const result = await sql`SELECT * FROM calendar`;

// ^ This is an array of objects mapping the results 
```

Additionally, since this is a templated string, we can use templates to insert variables:

```ts
const result = await sql`SELECT * FROM calendar WHERE date = ${date}`;
```

This is safe because the `sql` function is a template string, so it will be escaped by the engine. If you want to use transactions you can use the `begin` function:

```ts
const result = await sql.begin(async (tx) => {
    await tx`INSERT INTO calendar (date, event) VALUES (${date}, ${event})`;
});
```

This will start a transaction and run the queries inside the function. If an exception is thrown, the transaction will be rolled back.

Being built into Bun has a few benefits:

- It stops you from needing to deal with node-gyp and all of the complications that come with it.
- It uses Bun's built in TLS handling. This means that you don't have to worry about custom TLS certificates if you are using a service such as [Neon](https://neon.tech/).
- It reduces your dependencies which is useful for serverless environments and security auditing.
- It makes building a CLI tool for your local system easier. Say you want to do a simple Postgres transaction based on a specific input you give, you can do that easily by marking the file with a shebang telling it to be ran with Bun.

One thing I did notice in my testing of the Bun Postgres driver is that [I was able to make it segfault](https://github.com/oven-sh/bun/issues/16833). This has been sent over to the GitHub and I'm sure it will be fixed soon.

## Benchmarks

To benchmark the performance and compare it to Bun's numbers, I've created a simple script that runs a series of queries and measures the time it takes to run them. [You can view the code here.](https://gist.github.com/IAmJSD/570076df80919063e1f1f9eaa2103423) Bun in their announcement claims it is 50% faster than the alternative libraries:

<p class="px-2 max-w-xl mx-auto">
    <img src="/images/bunpg/claim1.png" alt="Bun claiming their runtime is 50% faster than pg and postgres.js at making 100k select queries" />
</p>

I decided to perform 2 types of tests here to test out these claims:

1. I decided to test their claims on face value. This might be useful in say a CLI or migration setting where you need to check each value, but generally, you will not run 100k requests one after another in high load and will rather prefer parallelism.
2. I decided to do a test to see how Bun would handle parallel requests and how many it could handle per second.

I ran the tests on a Intel Xeon D-153 dedicated server with 32GB RAM running Ubuntu 24.04 and the latest Bun release at the time of writing (1.2.1) with the latest LTS Node release (22.13). I also ran the same tests on Node (bar the Bun client) to see how that would stack up.

My results firstly show that for the case listed on the Bun announcement, Bun is indeed the fastest by 66% (faster than Bun claims). Interestingly, pg with Bun was slower than pg with node.

<p class="px-2 max-w-xl mx-auto">
    <img src="/images/bunpg/100k_bench.png" alt="Bun's built in driver takes 15.6 seconds, pg.js (node) takes 23.6 seconds, pg.js (bun) takes 24.7 seconds, pg (node) takes 25.4 seconds, pg (bun) takes 31.1 seconds" />
</p>

Things get interesting through when we look at parallel requests. As you can see, Bun is outranked by postgres.js, but pg is constantly significantly slower than both:

<p class="px-2 max-w-xl mx-auto">
    <img src="/images/bunpg/rps_static.png" alt="pg.js (Bun) handles 40.9k requests per second, Bun's built-in driver handles 33.9k requests per second, pg.js (Node) handles 27.9k requests per second, pg (Bun) handles 15.0k requests per second, pg (Node) handles 7.8k requests per second" />
</p>

Using a static query here is interesting because we can see that although the Bun driver was the second fastest and faster than postgres.js when using the Node runtime, the Bun postgres.js runtime is fastest. Whilst in the grand scheme of things the difference likely will not be noticed by most users, it is interesting to see that the Bun driver is not the fastest as soon as parallelism is thrown into the mix. With that said, at 33k requests per second, it was still no slouch.

<p class="px-2 max-w-xl mx-auto">
    <img src="/images/bunpg/rps_template.png" alt="postgres.js (Bun) handles 51.1k requests per second, postgres.js (Node) handles 29.7k requests per second, Bun's built-in driver handles 21.1k requests per second, pg (Bun) handles 8.7k requests per second, pg (Node) handles 5.9k requests per second" />
</p>

When we pass in a parameter, suddenly the Bun driver gets significantly slower than postgres.js but still faster than pg. Overall, the Bun runtime is still significantly faster than the Node one, allowing postgres.js to handle 20k more requests per second than with the Node runtime.

## Conclusion

Overall, I am very impressed with the new Bun Postgres driver. It is a great addition to the Bun ecosystem and it reduces the need on gyp which is a huge win for the ecosystem and on bundle sizes. Some performance optimisations can likely still be made, but it is by no means a slow driver.

The possibilities of a driver such as this are huge, especially with the ability to use it for shell scripting opened up by this. Additionally, the built in SSL support works great with services such as [Neon](https://neon.tech/) which already handle TLS for you, making it extremely seamless to implement.
