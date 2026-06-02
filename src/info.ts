export const name = "Astrid Gealer";
export const description =
    "Hi! My name is Astrid Gealer and I am a passionate developer from the UK who has experience with full-stack development.";
export const url = "https://astrid.place";
export const secondLine = `
    Owns Web Scale Software Ltd (currently contracted by
    <a class="underline" href="https://neon.tech">Neon</a>)`;
export const phoneNumber = "+44 7389 867817";
export const email = "astridgealer@gmail.com";

export type Experience = {
    company: string;
    url: string;
    contract: boolean;
    startDate: string;
    endDate: string | null;
    description: string;
};

const vantageDescription = `
At Vantage, I worked on several things:

- I rewrote ec2instances.info (https://instances.vantage.sh) and blogged about it on the Vantage website (https://www.vantage.sh/blog/ec2instances-architecture)! This rewrite is genuinely one of the projects I'm proudest of in my career, and I feel really lucky to have been part of it.
- I wrote newsletters.vantage.sh (https://newsletters.vantage.sh)! A tool that lets you get instances data in your inbox.
- I wrote instances-mcp.vantage.sh (https://instances-mcp.vantage.sh)! A tool that lets you get instances data in your MCP client.
- I wrote the official Python (https://github.com/vantage-sh/vantage-python) and TypeScript (https://github.com/vantage-sh/vantage-ts) clients for the SDK. If you use the core product and one of these languages, I think you will love this. I spent a lot of time on the typing of the TypeScript library in particular, and am really proud of the results. I don't think it feels like just another OpenAPI client.
- I rewrote the entire vantage-mcp-server (https://github.com/vantage-sh/vantage-mcp-server). A lot of the history was squashed into a single Git commit, but I was responsible for the "on Rails" structure of it and the TS library that powers it.
- If you use the core product and generate clients based on the OpenAPI specification, you may well have noticed that the specifications improved significantly and now match the actual responses much more closely. This was me! I updated the Ruby code on the backend to make sure the responses better aligned with the schemas. It's still imperfect — there's more work to do, and there are limitations with the framework being used — but it's far better than it was.
- I wrote https://vantage.sh/models - This site is an incredible feat of engineering that brings together many different data columns through SQL queries. SQL is such a powerful way to express data, and it works really well here.
`;

export const experiences: Experience[] = [
    {
        company: "Vantage",
        url: "https://vantage.sh",
        contract: true,
        startDate: "April 2025",
        endDate: "April 2026",
        description: vantageDescription,
    },
    {
        company: "Neon",
        url: "https://neon.tech",
        contract: true,
        startDate: "September 2024",
        endDate: null,
        description:
            "I have worked on several developer tools for Neon, including a website to check Postgres versions, internal marketing tooling in TypeScript, tooling to bootstrap project setups for AI workflows, and benchmarking.",
    },
    {
        company: "Citi",
        url: "https://citi.com",
        contract: false,
        startDate: "January 2023",
        endDate: "March 2024",
        description:
            "At Citi, I worked on internal tooling to help with infrastructure.",
    },
    {
        company: "Krystal",
        url: "https://krystal.io",
        contract: false,
        startDate: "July 2021",
        endDate: "December 2022",
        description:
            "At Krystal, I helped with many different things, including their Go CLI and SDK, a platform written in Ruby on Rails and Go, and their open-source network tooling package.",
    },
    {
        company: "DigitalOcean",
        url: "https://digitalocean.com",
        contract: false,
        startDate: "July 2019",
        endDate: "July 2021",
        description:
            "At DigitalOcean, I worked on tooling for the community site. These were high-traffic tools that were linked from the main community site, including DNS/SPF/nginx management tooling. This was in the earlier days of TS tooling, and I was instrumental in building the webpack wrappers used internally to handle our Vue configurations. I also helped migrate parts of the old Rails community site to Next.js.",
    },
];

export const aboutMe = `
Hey! I'm Astrid, a software engineer from the UK with over 6 years of experience. I'm currently looking for full-time work. I've been lucky enough to work on many different projects (including some you may use!) for companies that are leaders in their field. I mainly work with TypeScript and Go, but have experience with many other languages and frameworks. I'm looking for work within the UK, EU, or US.
`;
