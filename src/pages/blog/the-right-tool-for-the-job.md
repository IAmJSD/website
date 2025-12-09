---
bluesky:
    cid: "bafyreie4zvmhhw2ojd3ecq6z3zy5r2qhjokd27ogy6i3yj7c7wdktqrika"
    uri: "at://did:plc:ij5756nvubeeqo2kn6eeezdx/app.bsky.feed.post/3m7leai6xpl2l"
layout: ../../layouts/BlogPostLayout.astro
title: "The right tool for the job"
description: "The anti-rust cult is wrong. Here's why."
---

Recently, [Prisma announced switching from using a intermediate binary to handle GraphQL which then hits the database to just using JS to handle it being the default](https://x.com/prisma/status/1991155390080598366). To anyone familiar with Prisma, this move makes total sense. Having a intermediate binary caused issues when deploying to the edge, was a large binary to pass around because it had to handle so much, and was generally a huge maintainance burden for the Prisma team. It is the main reason when I handle databases in TypeScript, I generally use [Drizzle](https://orm.drizzle.team/) these days.

None of this was ever an attack on Rust. It's about using the right tool for the job. For a JS project, it is far better for your processing to be done in JS to avoid bloat and processing time. It wouldn't matter what language the binary was written in, just having it alone is a speed penalty we want to avoid.

There are many on the internet that have a almost personal gripe with Rust. So much so that any error or win from a removal of Rust from a product is seen as an epic own! Generally, this is tied with transphobia. Seeing trans people as inferior and "woke", and therefore Rust as a culture. Rust isn't such, Rust is a language. Not even one I generally write in, and in some ways I think is overused. But I recently got into drama with one of these people called the Lunduke Journal. After the Prisma Rust removal, his argument was that it was Rust's fault and removing it fixed everything because it is Rust specifically. I think this argument is disengenous because removing any unneeded hops will yield a speed boost. It wouldn't matter if this binary was Rust, Go, C, or C++, calling out to a GraphQL endpoint occurs expense in the framework. He couldn't just be happy for Prisma, though. It had to be a "culture war" attack. This is hardly new to him.

## Lunduke's war on Rust

Lunduke has multiple bad faith takes on Rust:

- [Directly labels Rust community as a cult, listing behaviors like discouraged dissent and unethical actions without balanced discussion](https://x.com/LundukeJournal/status/1996609062100688966)
- [Mocks Rust supporters as having poor comprehension through a hypothetical scenario calling them "stupid" and a "church"](https://x.com/LundukeJournal/status/1998212797658697834)
- [Reports speed improvements after dropping Rust but frames it to provoke "Rust zealots" as "very angry"](https://x.com/LundukeJournal/status/1998177531640578187)
- [Accuses note writers of poor comprehension while misrepresenting the note](https://x.com/LundukeJournal/status/1998113258553696540)
- [Claims JS is faster based on Prisma's migration, ignoring that gains were from removing interop overhead](https://x.com/LundukeJournal/status/1997687018852102501)
- [Dismisses a pro-Rust video by mocking the presenter's cat ears](https://x.com/LundukeJournal/status/1996615471345418669)
- [Calls "written in Rust" a cult mantra for dedication](https://x.com/LundukeJournal/status/1994291151289872890)
- [Misquotes Cloudflare to imply Rust easily causes corruption](https://x.com/LundukeJournal/status/1991200161112944824)
- [Preemptively calls defenders "apologists" and asserts causation in outage](https://x.com/LundukeJournal/status/1991008992089211035)
- [Attributes outage to Rust rewrite, calling it a "memory error" despite being a panic, not corruption](https://x.com/LundukeJournal/status/1990957849372209235)
- [Highlights vulnerabilities sarcastically, implying Rust's safety is overhyped](https://x.com/LundukeJournal/status/1988346904581726501)
- [Mocks Tor's security claims as over-the-top marketing](https://x.com/LundukeJournal/status/1987550001057370205)
- [Strawmans Rust claims as "perfect and infallible," calling believers cultists](https://x.com/LundukeJournal/status/1986491412561482206)
- [Compares Rust rewrites to poor Disney/Netflix adaptations](https://x.com/LundukeJournal/status/1986187795405107434)
- [Accuses Rust devs of intent to harm based on politics, speculates backdoors](https://x.com/LundukeJournal/status/1986142018418966545)
- [Reports vulnerabilities emphasizing "steady stream of bugs"](https://x.com/LundukeJournal/status/1988717749514711059)
- [Raises trust red flags due to "activists, bootstrapping, forced adoptions"](https://x.com/LundukeJournal/status/1986148710615572909)
- [Ubuntu Rust utils slower and buggy - Ignores it is not a LTS](https://x.com/LundukeJournal/status/1967977345320734823)
- [Rust sudo does less than original - Highlights incompleteness to argue pointlessness](https://x.com/LundukeJournal/status/1920116772742500780)
- [Forced Rust adoption in Debian/Ubuntu - Calls adoptions "forced," questions motives](https://x.com/LundukeJournal/status/1985520622072402135)
- [Rust changes master to main - Mocks change as hypocritical adherence to inclusive naming](https://lunduke.substack.com/p/rust-changes-from-master-to-main)
- [Rust is a Cult video - Applies cult checklists to Rust community](https://www.youtube.com/watch?v=bGrQcpIeBts)
- [Can We Trust Rust? article - Questions trust due to "Leftist Extremist Activists"](https://lunduke.substack.com/p/can-we-trust-rust)

Recently, [Lunduke attacked me](https://archive.is/GhDsN) for replying to a video [he made claiming Theo (t3.gg) is a "Rust zealot"](https://x.com/just_some_dev/status/1998179356699754864), he made the following post. I will disect each bit below:

> ☑️ Attacks people who are perceived to be critical of Rust.

You can be critical of Rust, just do it for good reasons. There are very valid concerns about compile time and the impact on engineering cycles, but "I don't like some people that code in it because they are transgender" is a genuinely trash reason.

> ☑️ Man who thinks he's a woman.

I'm transgender. There's not really a good reply to this one because its so patently bigoted.

> ☑️ More facial piercings than is probably a good idea (including the bull nose ring thing).

I do have a bit of an alternative style. Many people came to complement it. This is so subjective its stupid to argue.

> ☑️ From Europe (UK).

Yes? What does this even mean? The UK is far from "woke". My rights are constantly being taken away from me, and its a constant fight to be seen as human here.

> I'd say that's enough checkboxes! You, sir, are a member of the Church of Rust!

Just ignoring the "sir" bit, what a genuinely stupid thing to say to someone whos bread and butter is primarily writing Go and TS. I like Rust, yes, and I will go into detail later about its great uses. I believe in the right tool for the job.

Notice how all of those arguments have to do with looks or my location, not about the argument? That's because fundementally its indefensible. [Theo](https://x.com/theo/status/1808719466630689208) [frequently](https://x.com/theo/status/1996777766977785896) [criticises](https://x.com/theo/status/1938390495757226252) [the](https://x.com/theo/status/1938016018187882914) [use](https://x.com/theo/status/1909326276806295636) [of](https://x.com/theo/status/1899480416048017482) [Rust](https://x.com/theo/status/1939759698020106456) [in](https://x.com/theo/status/1952513681709027456) [tooling.](https://x.com/theo/status/1899584432002277682) And, mostly, I fully agree! A lot of the time with JS tooling, the nanoseconds don't actually matter when you could ship new optimisations to things to shave even more time. A crash in most JS related tooling is annoying, but its not a flight control system either. Some more relaxation when it comes to thread safety can allow for fast development cycles. I love Go for this sort of thing because it strikes this balance well for JS tooling, and tsgo has by all accounts been successful.

Lunduke's attack was so stupidly personal over a technical opinion it actually was somewhat amusing to me. That doesn't make what he said okay, not at all, but that is it didn't upset me, inspired this, and gave me some great new people who are in my community now.

## The right tool for the job

I mostly code in TypeScript because of the ability to have rapid iteration cycles with type unions and other luxuries that can be encoded into libraries and prevent pitfalls that you can fall into. Additionally, being able to share utilities between my backend and frontend is a godsend. RSC's (ignoring the recent unfortunate security event) allow for a fantastic mix, allowing you to keep a connection open, stream down a placeholder, then fill it with more information and even components that run on the client with data passed in as it loads. I think this is really cool, but there are pitfalls:

- Types can be manipulated and accidentally changed into something the object is not. Say you return a User type that doesn't have `password: string`, unless there's some output validation, you will return the password on the object if you send it and the rest of the shape is satisfied.
- It is still JavaScript under the hood which means there are a lot of JS-isms. Take the recent prototype pollution vulnerabilities. You can mitigate them, but you need to be aware.
- Server functions still require the shape to be validated! The type of the parameter does NOT guarantee the object will be that shape, and you need to authenticate too. This can make your functions a bit clunky.
- JS has got way faster and more efficient over the years, but if you're working with large datasets and need to process them or need multiple threads to compute something, in many cases you will want something else.
- JS isn't great at error handling and can throw errors in really subtle ways.

Go fills this need for me. The lack of type unions and reliance on any instead causes a lot of fear for me sometimes, but the way parallelism works in Go is fantastic. Go is the fastest language to build parallel applications in many cases where whilst you don't want panics, it is not mission critical if they happen due to race conditions (with decent mechanisms to try and mitigate this). Additionally, errors, whilst still a very generic type, are at least explicit and need to be handled. I generally use Go for build scripts where large amounts of data from many sources need to be processed and combined (which, for things I maintain, is relatively common). This makes it fantastic for JS tooling too. A panic sucks, but it won't destroy the world. 

With that said, the generic errors and the lack of guard rails from randomly panicing don't suit some projects. Additionally, Go requires a garbage collector which comes with overhead and because the compiler is blazing fast it is also not that smart. Several objects can be nil when that is odd design, and its not possible to put extremely strict parallelism features in the language design. This is where Rust comes in.

Rust can be painful to write due to this. Protecting from race conditions at a compiler level is complex and requires giving Rust a clear idea of where memory is going and who will own it. Additionally, writing things like radix trees in Rust is more complex because you need to figure out how to hand the object to the leaf. A lot of this is a "skill issue" for sure, but it is additional cognitive overhead. Additionally, the build times can be really slow which can be painful.

However, even with all of this, I think its unfair to write Rust off. Because the codebase encodes all of this, the codebase knows who owns what, that reads/writes are safe, and how to process the entire flow without a garbage collector. This means that Rust has a strong edge in situations where data integrity is critical, when life or death depends on code working, or when squeezing every last nanosecond out of a server is important.

Whilst I mainly write TypeScript and Go, I do not write off the sheer importance of Rust on society. I would feel far safer flying in a plane where the control systems firmware was programmed in Rust because so many of the danger spots are ironed out at compile time. All these languages have a place, and being religious about or dunking on one disregards its genuine place in society.
