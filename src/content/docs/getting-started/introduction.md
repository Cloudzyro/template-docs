---
title: Introduction
description: What Tidewire is, how the API is organized and where to go next.
sidebar:
  order: 1
---

Tidewire is a messaging API for sending text messages and receiving delivery events. You talk to it over HTTPS with JSON, from any language, and it tells your app what happened to every message through webhooks.

## How the API is organized

The API is built around a few resources:

| Resource | What it holds |
| --- | --- |
| **Messages** | A single text message and its delivery status |
| **Contacts** | People you send to, with their consent and preferences |
| **Webhooks** | Addresses Tidewire calls when something happens |

Every resource has a stable ID with a short prefix, so you can tell them apart at a glance: `msg_`, `ctc_` and `whk_`.

## Base URL

All requests go to one address:

```text
https://api.tidewire.example/v1
```

## What you'll need

- A Tidewire account and an API key (see [Authentication](/getting-started/authentication/))
- Any HTTP client, or one of the official libraries for JavaScript, Python or Go
- About five minutes for the [Quickstart](/getting-started/quickstart/)
