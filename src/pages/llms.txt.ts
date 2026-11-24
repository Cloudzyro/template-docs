// Builds /llms.txt: a plain-text map of every page, so AI tools can find and
// read the docs. See https://llmstxt.org for the format.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import site from "../../site.config.mjs";

const sections: Record<string, string> = {
  "getting-started": "Getting started",
  guides: "Guides",
  api: "API reference",
  resources: "Resources",
};

export const GET: APIRoute = async ({ site: base }) => {
  const docs = (await getCollection("docs")).filter((d) => d.data.draft !== true && d.id !== "404");
  const url = (id: string) => new URL(id === "index" ? "" : `${id}/`, base).toString();

  const lines = [`# ${site.productName}`, "", `> ${site.description}`, "", `API version: ${site.apiVersion}`, ""];
  const home = docs.find((d) => d.id === "index");
  if (home) lines.push(`- [${home.data.title}](${url(home.id)}): ${home.data.description ?? ""}`.trimEnd(), "");

  for (const [dir, label] of Object.entries(sections)) {
    const pages = docs
      .filter((d) => d.id.startsWith(`${dir}/`))
      .sort((a, b) => (a.data.sidebar?.order ?? 99) - (b.data.sidebar?.order ?? 99) || a.id.localeCompare(b.id));
    if (!pages.length) continue;
    lines.push(`## ${label}`, "");
    for (const p of pages) lines.push(`- [${p.data.title}](${url(p.id)})${p.data.description ? `: ${p.data.description}` : ""}`);
    lines.push("");
  }

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
