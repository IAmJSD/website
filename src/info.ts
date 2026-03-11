export const name = "Astrid Gealer";
export const description =
    "Hi! My name is Astrid Gealer and I am a passionate developer from the UK who has experience with full stack development.";
export const url = "https://astrid.place";
export const secondLine = `
    Owns Web Scale Software Ltd (currently contracted by
    <a class="underline" href="https://neon.tech">Neon</a> and <a class="underline" href="https://vantage.sh">Vantage</a>)`;
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
At Vantage, I have worked on several things:

- I rewrote ec2instances.info (https://instances.vantage.sh) and blogged about it on the Vantage website (https://www.vantage.sh/blog/ec2instances-architecture)! This rewrite is genuinely one of the proudest moments of my career, and I'm so lucky I was able to be involved in this.
- I wrote newsletters.vantage.sh (https://newsletters.vantage.sh)! A tool that lets you get instances data in your inbox.
- I wrote instances-mcp.vantage.sh (https://instances-mcp.vantage.sh)! A tool that lets you get instances data in your MCP client.
- I wrote the official Python (https://github.com/vantage-sh/vantage-python) and TypeScript (https://github.com/vantage-sh/vantage-ts) clients for the SDK. If you use the core product and one of these languages, I think you will love this. I spent a lot of time on the typing of the TypeScript library in particular, and am really proud of the results. I don't think it feels like just another OpenAPI client.
- I rewrote the entire vantage-mcp-server (https://github.com/vantage-sh/vantage-mcp-server). A lot of the history was squashed into a single Git commit, but I was responsible for the "on Rails" structure of it and the TS library that powers it.
- If you use the core product and generate clients based on the OpenAPI specification, you may well have noticed that the specifications got a ton better and matched what is in the responses more. This was me! I updated the Ruby code on the backend to make sure the responses better aligned with schemas. It is imperfect and there is still work to do there and limitations with the framework being used, but it is so much better than it was.
- I wrote https://vantage.sh/models - This site is a incredible feat of engineering that brings together many different columns as SQL queries. SQL is such a powerful syntax to express data with and it works so well here.
`;

export const experiences: Experience[] = [
    {
        company: "Vantage",
        url: "https://vantage.sh",
        contract: true,
        startDate: "April 2025",
        endDate: null,
        description: vantageDescription,
    },
    {
        company: "Neon",
        url: "https://neon.tech",
        contract: true,
        startDate: "September 2024",
        endDate: null,
        description: "I have worked on several developer tools for Vantage, including a website to check Postgres versions, some marketing internal tooling in TypeScript, some tooling to handle bootstrapping a project setup for AI workflows, and benchmarking.",
    },
    {
        company: "Citi",
        url: "https://citi.com",
        contract: false,
        startDate: "January 2023",
        endDate: "March 2024",
        description: "I have worked on several developer tools for Vantage, including a website to check Postgres versions, some marketing internal tooling in TypeScript, some tooling to handle bootstrapping a project setup for AI workflows, and benchmarking.",
    },
    {
        company: "Krystal",
        url: "https://krystal.io",
        contract: false,
        startDate: "July 2021",
        endDate: "December 2022",
        description: "At Krystal, I helped with many different things such as their Go CLI, their Go SDK, a platform written with Ruby on Rails/Go, and their open source network tooling package written in Go.",
    },
    {
        company: "DigitalOcean",
        url: "https://digitalocean.com",
        contract: false,
        startDate: "July 2019",
        endDate: "July 2021",
        description: "At DigitalOcean, I worked on tooling for the community site. These were high traffic tools which were linked off from the main community site, including tooling such as DNS/SPF/nginx management. This was in the earlier days of TS tooling, and I was fundamental in making webpack wrappers that were used internally to handle our Vue configurations. I also helped in migrating parts of the old Rails community site to Next.js.",
    },
];

export const aboutMe = `
Hey! I'm Astrid, a software engineer from the UK with over 6 years of experience. I am currently looking for full time work. I have been lucky enough to have worked on many different projects (including some you may use!) and have worked for many companies which are leading at what they do. I mainly work with TypeScript and Go, but have experience with many other languages and frameworks. I am looking for work within the UK or EU.
`;
