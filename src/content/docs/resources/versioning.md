---
title: Versioning
description: How dated API versions work, how to upgrade, and how to keep docs for older versions.
sidebar:
  order: 1
---

:::note[Current version: 2026-10-01]
These docs describe API version **2026-10-01**. Older versions keep working; see below for how long.
:::

## How API versions work

Tidewire uses **dated versions**. Your account is pinned to the version that was current when you made your first request, so a new release never changes how your existing code behaves.

To try a newer version on a single request, send a header:

```http
Tidewire-Version: 2026-10-01
```

When you're happy, upgrade your account's default version in the dashboard. You can roll back within 72 hours.

## What counts as a breaking change

We release a new version for changes like these:

- Removing or renaming a field or endpoint
- Changing a field's type or the meaning of a value
- Adding a new required parameter

These are **not** breaking, and can arrive at any time:

- New endpoints, optional parameters or response fields
- New event types and error codes
- Changes to the order of fields in a response

## Support window

Each version is supported for at least 24 months after it's replaced. We email account owners six months before a version is retired.

## Keeping docs for older versions

This site documents one version at a time. To publish docs for an older version alongside the current one, copy the pages into a folder such as `src/content/docs/v2025-04/`, add it to the sidebar in `astro.config.mjs` with its own label, and add a banner to those pages pointing readers to the latest version.
