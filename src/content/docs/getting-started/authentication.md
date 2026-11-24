---
title: Authentication
description: Use API keys to authenticate requests, and keep them safe.
sidebar:
  order: 3
---

Every request is authenticated with an API key sent as a bearer token:

```http
Authorization: Bearer tw_live_EXAMPLEKEY000000000
```

## Test and live keys

| Prefix | Mode | Sends real messages | Charged |
| --- | --- | --- | --- |
| `tw_test_` | Test | No | No |
| `tw_live_` | Live | Yes | Yes |

Objects created in test mode are only visible to test keys, and the same goes for live mode, so you can't mix them up by accident.

:::caution[Keep live keys secret]
A live key can send messages and spend money. Keep it on your server, load it from an environment variable or a secrets manager, and never ship it in a browser or mobile app.
:::

## Restricted keys

For services that only need part of the API, create a **restricted key** and choose exactly which resources it can read or write. A reporting job, for example, only needs `messages:read`.

## Rotating a key

1. Create a new key in the dashboard.
2. Deploy it to your servers.
3. Revoke the old key once traffic has moved over.

Revoked keys stop working immediately and return `401 Unauthorized`.
