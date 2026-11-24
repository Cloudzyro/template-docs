import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import site from "./site.config.mjs";

export default defineConfig({
  site: site.url,
  trailingSlash: "always",
  integrations: [
    starlight({
      title: site.title,
      description: site.description,
      logo: { src: "./src/assets/logo.svg", alt: `${site.productName} logo` },
      favicon: "/favicon.svg",
      social: site.social,
      customCss: [
        "@fontsource-variable/inter",
        "@fontsource-variable/space-grotesk",
        "@fontsource-variable/jetbrains-mono",
        "./src/styles/theme.css",
      ],
      head: [
        { tag: "meta", attrs: { property: "og:image", content: new URL("/og-image.png", site.url).toString() } },
        { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
      ],
      expressiveCode: {
        themes: ["github-dark-default", "github-light"],
        // Plain code frames: no fake window dots, no drop shadow. Titled blocks still show their file name.
        defaultProps: { frame: "code" },
        styleOverrides: {
          borderRadius: "0.75rem",
          codeFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace",
          frames: { shadowColor: "transparent" },
        },
      },
      sidebar: [
        { label: "Getting started", items: [{ autogenerate: { directory: "getting-started" } }] },
        { label: "Guides", items: [{ autogenerate: { directory: "guides" } }] },
        {
          label: "API reference",
          badge: { text: site.apiVersion, variant: "default" },
          items: [{ autogenerate: { directory: "api" } }],
        },
        { label: "Resources", items: [{ autogenerate: { directory: "resources" } }] },
      ],
      lastUpdated: false,
      pagination: true,
      disable404Route: true,
    }),
  ],
});
