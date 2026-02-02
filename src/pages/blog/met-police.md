---
bluesky:
    cid: "bafyreigga6s7is3jfu6qjk4uwottnzwm7eanca3up6uvhugtlfftxani6y"
    uri: "at://did:plc:ij5756nvubeeqo2kn6eeezdx/app.bsky.feed.post/3mdtiy7uzsi2s"
title: "The Metropolitan Police are not happy with me"
description: "The Metropolitan Police is interviewing me about a CSV file that was publicly available being in a Git repo that I took down."
layout: ../../layouts/BlogPostLayout.astro
---

I generally have a good introduction for these sorts of things, but this is by far the craziest thing I've had to deal with in my life. I hope you leave this blog post feeling that your tax payer money is being utterly wasted on this operation.

This is going to be brief, mainly because the thing I am being questioned for is also so stupidly brief.

## The action that sparked the fire

On January 6th, the direct action group Bash Back published the donation data of the Free Speech Union, excluding credit card/address info, and only people that donated over £50. I thought this was interesting public interest data and was legal due to being published on public interest grounds.

I love doing data analysis. My day work generally works around scripting management of gigantic amounts of data, and I'm quite good at it. I made a Git repo with a Next.js project in it, and this csv file was in the `public` folder. When I made the repository on GitHub, I forgot to mark it private.

This was it. I did not leak the data, it was publicly available and widely reported on within the press. I have no affiliation to Bash Back.

## The FSU's lawyers come knocking

The FSU (Free Speech Union)'s lawyers emailed me twice. The FSU's lawyers seemingly have issues with spam on GMail (probably either mail reputation or a misconfiguration, they should probably look into that). I missed the first email, but the second email I saw within 15 minutes. I immediately complied and took the repository down and destroyed my local copy once I realised the data was now not legal to host. GitHub never took any action on my user and it is still active (as it should be, I was responsive to their legal notice when I became aware).

Once it was determined that this was effectively a cease and desist and not accusing me of being the party that hacked them, I just forgot about this. Their lawyers said nothing extra was needed on my end, so I just left it at that. I thought this was done.

## Waking up to a Met Police detective

I have recently been moving, so I'm currently not at my home address that most people have, including the Metropolitan Police. I sleep with my phone silent, so I woke up to a bunch of missed calls from someone claiming to be a Metropolitan Police detective. I was obviously shocked and very sceptical, so gave them an email to send a message to which matched the identity they claimed. Sure enough, a validated email from a `met.police.uk` e-mail address came though.

For context, I live in Brighton. My local police constabulary is Sussex Police. The Met have multiple divisions that work like the FBI. This is the British equivalent of the FBI giving you a call. I obviously called right back, and found out that they tried to knock on my old flat to get me to go to a voluntary interview because of [a breach of S170 of the DPA.](https://www.legislation.gov.uk/ukpga/2018/12/section/170) I feel I have defences under sections 2c and 3a here. Obviously its not a question that I did the `git push`, my SSH key is tied to that, but the intent is.

Additionally, criminal prosecutions in the UK have to meet a bar with the Crown Prosecution Service that it is in the public interest. With a GitHub repository nobody saw and I doubt anyone but me cloned, this would be a very hard bar to clear. I will be amazed if they are able to. This has already burnt so much faith by so many in an already untrusted Met Police.

My voluntary interview is Tuesday. We will see what they plan to do then, the absolute worst case this is a summary offence. One thing that made me very annoyed was they were able to cook up a social worker by Tuesday because of certain things on my file. I tried desperately to get one about 3 years ago to no avail, but they can just pluck one out a hat. Don't get me wrong, I'm glad they were able to get a social worker, but is the idea when I was at my mental low point, I should've committed arson or something?

There's so much the Met should be investigating. Investigating someone that deleted a file when prompted should be on the bottom of the pile. My actions hurt nobody. The British state is more interested in harming their engineers than helping. No wonder everyone is leaving this country.
