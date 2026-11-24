// Site-wide settings in one place. Pages themselves live in src/content/docs.
export default {
  // Your public address. Used for the sitemap, social cards and llms.txt.
  url: process.env.SITE_URL ?? "https://docs.example.com",
  title: "Tidewire Docs",
  productName: "Tidewire",
  description:
    "Documentation for the Tidewire API: send messages, manage contacts and receive webhooks from any language.",
  apiVersion: "2026-10-01",
  social: [
    { icon: "github", label: "GitHub", href: "https://github.com/" },
    { icon: "discord", label: "Community", href: "https://discord.com/" },
  ],
};
