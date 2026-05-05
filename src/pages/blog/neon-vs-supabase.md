---
layout: ../../layouts/BlogPostLayout.astro
title: "Neon vs Supabase: Which database should I use?"
description: "Picking the correct choice is the difference between success and failure."
---

**Legal disclosure:** Neon commissioned me to dig into the database differences and document them here.

Generally, when people are discussing databases which can scale with you traffic, the choice is between Neon and Supabase. The database you start with is so important and the result of getting this wrong can be very costly. This was always true, but is especially true in a high AI traffic and tool call world.

## You probably do not know when your high traffic moment is

The reality is that unless your product is totally stagnant, it is extremely hard to predict load. With other platforms becoming more lightweight with high scalability, it is no longer as likely your web server will be the one to bottleneck you in the event of high traffic and instead it could be your database.

This is a really bad position to be in. Picture this, your new service hits the front page of Hacker News. What should be a position for signing up people en masse has now turned into a situation where the majority of people are hitting server errors. Your companies reputation is harmed and you need to quickly figure out what caused this. You're scrambling to find the issue and then you realise you are hitting connection limits. This is the unfortunate reality of services that are designed around a strict VM structure; because [the storage and compute is tied, it can be possible with downtime to scale up, but not back down.](https://supabase.com/pricing) By contrast, on Neon, [your database scales with you, all the way between zero and infinite traffic!](https://neon.com/docs/guides/autoscaling-guide) This means that you cam spend more time on important moments for your business and projects rather than losing the trust of people in it. Additionally, since the Databricks acquisition, [each compute unit hour got significantly cheaper.](https://neon.com/blog/major-compute-price-reduction-on-neon) With auto-scaling, you [save up to 7.5x on cost](https://neon.com/autoscaling-report) as well as make your systems more reliable.

There is another advantage to this too; your database might be gigantic, but may a lot of the time you do not need that much compute. When Neon was made, it was built with this fully in mind. Since Neon was acquired, storage prices have significantly dropped. This means that it is $0.35/GB to store data in Neon and does not require the shape of the VM to change since instead of using a virtual disk for each database it is using a [custom storage layer of Safekeepers and Pageservers.](https://neon.com/docs/introduction/architecture-overview)

To demonstrate how important picking the correct database can be, I composed a benchmark which is [open source here.](https://github.com/IAmJSD/atproto-firehose-benchmark) The way this benchmark works is the following:

1. Before any benchmarking happens, we first sit there and consume the Bluesky public firehose for 5 minutes and then anonymise it. This will give us a realistic baseline of what a interaction heavy social media networks traffic patterns may look like. This could just as easily be a load of mass signups or interactions for your service!
2. We then use the same dataset on both for consistency (and for transparency, this is pushed to Git). We use the default options on Neon and on Supabase we use the highest option that can be made on creation (the $60/month plan).
3. Both databases are in us-east-2 with the GCP VM used to benchmark them is in us-central1.
4. We then run the Node script which replays everything and creates a video of the bemchmarks.

The results speak for themselves:

<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-start; gap: 5em;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <video autoplay loop src="/videos/neon.mp4" controls aria-labelledby="neon-benchmark-caption" style="max-width: 25em;"></video>
    <p id="neon-benchmark-caption">Neon Benchmark Results</p>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <video autoplay loop src="/videos/supabase.mp4" controls aria-labelledby="supabase-benchmark-caption" style="max-width: 25em;"></video>
    <p id="supabase-benchmark-caption">Supabase Benchmark Results</p>
  </div>
</div>

Whilst Neon was able to consistently handle the traffic being sent to it at a far lower latency (generally under half), the Supabase database was rejecting most of the queries sent to it. At the moment you need it the most, Supabase will be slower and more error prone.

## The magic of branching

Remmber how I said that within Neon storage is $0.35/GB? I didn't mention one more magic trick of this, all the branches you use don't multiply your storage cost! This is because of a fundemental difference im how each platform sees branches: in Neon, a branch essemtially works in a similar way to what you might be used to with something like Git with a pointer to the last page state, and in Supabase a branch is a VM seeded off the last state of the database. Additionally, because there's not a fixed shape for compute in Neon, each branch can independently go to sleep and you will only be billed for writes made in that specific branch.

This means that in Neon, you can do things that would be wildly cost prohibitive to do in most other database providers. Want to spin up an anonymised preview environment that can be made for each commit with a combination of something like Vercel or Cloudflare Workers? Neon has you covered. Want to have a stagimg environment based on production but with anonymised data so that you can test with real user configurations? Neon has you covered.

By contrast, when it comes to Supabase, branching can be genuinely scary. For one, you cannot scale to zero on Supabase because the compute is tied, and each preview envionment would use a copy of the current database. But also it is not possible to cap the spend on Supabase. [This is because your capped Supabase account can still rack up bills with branching which can get extremely costly.](https://supabase.com/docs/guides/platform/manage-your-usage/branching)

## Want to use Supabase auth? Pay greatly

We've already touched on how scale-to-zero can significantly lower your bills, but how does authentication look in this picture?

Well, if you're using Supabase, the authentication story doesn't look too great. Supabase bills you for authentication based on monthly active users, and on the Pro plan you get 100,000 MAU included before it costs you $0.00325 per user after that. The really painful part comes when you decide to bring your own authentication provider. If you wire up Clerk, Firebase Auth, Auth0 or AWS Cognito, [Supabase will still charge you $0.00325 per third-party MAU](https://supabase.com/docs/guides/platform/manage-your-usage/monthly-active-users-third-party) just because those users happened to log in to your app. You are paying twice, once to your auth provider and once to Supabase, for the same user. If you have enterprise customers and need SSO, the situation gets worse since [the rate jumps to $0.015 per SSO MAU](https://supabase.com/docs/guides/platform/manage-your-usage/monthly-active-users-sso), which is roughly 4.6 times the standard rate. By the time you get to scale, this is not a rounding error: independent breakdowns put [an app at 500,000 MAU at around $1,300/month just for authentication](https://www.metacto.com/blogs/the-true-cost-of-supabase-a-comprehensive-guide-to-pricing-integration-and-maintenance), regardless of how the database itself is being used.

By contrast, Neon takes a very different approach. [Neon Auth is included in every plan with no separate per-MAU charges](https://neon.com/docs/neon-auth/overview); the Free plan covers up to 60,000 MAU and both the Launch and Scale plans cover up to 1 million MAU each before you need to talk to them. Authentication data lives in the `neon_auth` schema directly inside your own database, so your users are just rows that you can query and join against like any other table, allowing for seamless integration. The most important part is that Neon is database first rather than having a whole ecosystem expectation. If you would rather use Clerk, WorkOS, or another provider, you are not penalised for it because there is no third-party MAU bill waiting for you. The auth product is there if you want it, and entirely out of the way if you do not.

## Now you see your data, now you don't

On Supabase, a free-tier project that has been quiet for 7 days gets [automatically paused](https://supabase.com/docs/guides/troubleshooting/pausing-pro-projects-vNL-2a), and unpausing is not always a smooth experience. There are documented cases of [free-tier projects sitting stuck in a "pausing" state for over 24 hours after exceeding Disk IO with no clear recovery path](https://github.com/supabase/supabase/issues/44925), and [further reports of the same behaviour leaving developers locked out of their own database](https://github.com/supabase/supabase/issues/43038). It gets worse from there. Paused projects used to be restorable indefinitely, but [since June 2024 you only have a 90-day window before the project is permanently deleted](https://github.com/orgs/supabase/discussions/27497). The fact that this is even a concern has spawned [community tools dedicated to pinging your database on a cron just to keep it from being paused in the first place](https://github.com/travisvn/supabase-pause-prevention), which is a strange thing to feel like you need to install.

Neon's scale to zero is the opposite story. Your compute spins down when nothing is hitting it, your storage stays exactly where it was on the Pageserver, and when the next request lands [the database is back up in a few hundred milliseconds](https://neon.com/docs/introduction/scale-to-zero). There is no pause state for the platform to get stuck in, no countdown on your data, and no need to write a keep-alive cron job to protect yourself from your own database provider.
