---
bluesky:
    cid: "bafyreia6pzhaf4cwg3efcasxtnd4xeu53xai5yr7s6p62gomly5ibavece"
    uri: "at://did:plc:ij5756nvubeeqo2kn6eeezdx/app.bsky.feed.post/3ljpyhlriua2o"
layout: ../../layouts/BlogPostLayout.astro
title: "Rosie Duffield's Private Email Server"
description: "Roses are red, violets are blue, Rosie Duffield has a private email server, what about you"
---

**EDIT:** The new site on rosieduffield.co.uk is now up! All emails sent to that domain will be published there. The ending was updated to include this.

**EDIT 2:** The use of "government business" and national archives line was not accurate. This has been modified, but does not overall change the takeaway of the post.

Rosie Duffield is a formerly Labour MP known for her attacks against transgender people in the UK, support for the Cass review, and general pushing of transphobia within the Houses of Parliament. Unfortunately, she runs a private email server for her MP business instead of using her Parliament email, which has serious national security implications. This blog post isn't an expose on her (there's plenty of good stuff for that on the Internet), but rather her poor security practices.

Thanks so much to [Luna](https://bsky.app/profile/imlunahey.com) for sanity checking this post and some of my ideas here. This wouldn't have been as great without you!

**TLDR:** Rosie Duffield's Bluesky had a unregistered domain in the bio for her email [which I registered.](https://rosieduffield.co.uk) In her day to day practice, she uses a private email server located in America. This poses a serious national security risk.

## The security implications of using a private email server for MP business

To summarise, there are a few issues when it comes to her use of a private email server:

- It is unknown to the government and less well audited the hosts that they might be using. This creates a danger to constituents since MPs are commonly the target of attacks from different governments, and if a cyberattack against the host was successful and something sensitive was sent to them, this could potential endanger lives.
- It makes it much more difficult (if even possible) to comply with FOIA requests. People have a right to know certain information under UK law, and by using a private server, you endanger that right for people.
- It can potentially destroy data for the National Archives, a deeply important institution in the UK. It doesn't have to, there are tools that constituents use to get around this, but with the parliament emails it is guaranteed to be archived.

If you care about democracy, this should be extremely concerning to you. This exact situation came up in 2021, when [many government ministers were issued guidance related to their use of private email servers and had to step down.](https://www.bbc.co.uk/news/uk-politics-57642791)

## How I uncovered her email server

Rosie Duffield decided to join Bluesky. I'm not awfully sure why to be honest, she isn't really welcome there after how much harm she has caused to a community with a lot of transgender people. Anyway, she did, and after I posted to her about how much she hurt the people around me, I looked at her profile:

![Rosie Duffield's Bluesky profile with the email "enquiries@rosieduffield.co.uk"](/images/rosie-duffield/bsky.png)

That email immediately grabbed my attention. Parliament aren't likely to support her using a custom email address I thought. After looking up the domain in that email with dig I found nothing, so I presumed the domain was wrong (see below for some fun stuff related to that!). After doing a quick web search, I found her website at `rosieduffieldmp.co.uk`:

![Her website with the title "Rosie Duffield MP | Canterbury" and a Labour favicon (you might want to fix this by the way Labour!)](/images/rosie-duffield/title_and_favicon.png)

Sure enough, the "Email Me" link at the top of the page goes to a private email server:

![Inspect element showing "Email Me" going to a private email server](/images/rosie-duffield/inspect.png)

Ok - so we have established she does constituency business from a invalid domain and typos it in her social media. But who runs the mail server? That is a great question! This will get a little bit technical, but I'll try to explain this in the best way I can.

When your computer sends email, it will first ask the DNS server which holds the records for the domain "where should I send this email". This is called a MX record, and we can use a tool called `dig` to ask for these records. Lets do that with her domain:

![The dig results for MX records on rosieduffieldmp.co.uk, pointing to mail.rosieduffieldmp.co.uk](/images/rosie-duffield/dig_mx_root.png)

The answer here is effectively saying "ask for the main record on the `mail` subdomain". We will do that now:

![The dig results for A records on mail.rosieduffieldmp.co.uk](/images/rosie-duffield/dig_a_mail.png)

So we have a IP address now: `205.134.238.243`. We can now query the WHOIS details. Everybody who registers a domain or IP address is required to have valid contact information, and with that we can find out who the host is:

![WHOIS result showing Inmotion Hosting, Inc as the IP owner](/images/rosie-duffield/whois_res.png)

So we now know that her private mail server is hosted by [Inmotion Hosting, Inc](https://www.inmotionhosting.com/), an American hosting company. I am honestly opinion-less on their service or practices since I've never dealt with them before, but even using shared/dedicated hosting outside of Parliament causes the risks above, especially when it is by an American company. Out of curiosity, I used a tool called `traceroute` (which checks what routers are hit on the way to finding that IP address), and it appears to hit a lot of routers in the LAX area, indicating the datacentre is likely in LA (which furthers the risks since the US authorities do a lot of data collection):

![traceroute showing a lot of LAX routers](/images/rosie-duffield/traceroute_result.png)

Looking at [Shodan for this IP address](https://www.shodan.io/host/205.134.238.243), it appears it is also on shared hosting and shared by other domains. This presents a risk since if it was using this host at various points in the past, it could have (depending on how quickly the hosting provider patched, which is a variable that is hard to tell) been vulnerable to issues such as Heartbleed. This would pose a risk since a government could hack her as collateral or indeed target a vulnerability they know the UK government isn't vulnerable to in general but her host is, posing a national security risk.

## So... that typoed domain

So you might recall near the beginning of that story when I said I had to search for the actual domain because the domain in her bio was typoed. Well, there's a funny twist to that. I honestly at first presumed she owned it, but when I did a WHOIS lookup it was starting to look like she didn't. Well, I typed it into Porkbun, and low and behold:

![rosieduffield.co.uk marked as for sale on Porkbun](/images/rosie-duffield/domain_buyable.png)

I laughed my ass off at this news, this domain was just available to buy and use. I immediately bought the domain, [there is now a service to take emails sent to the domain that are public interest and put them on a webpage.](https://rosieduffield.co.uk) Probably should've parked that one Rosie, oops!
