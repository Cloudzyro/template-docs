---
title: Webhooks
description: Receive delivery events from Tidewire and verify that each request is genuine.
sidebar:
  order: 2
---

Webhooks let Tidewire tell your app when something happens, instead of your app asking over and over. Register an HTTPS address and choose which events it should receive.

## Events

| Event | When it fires |
| --- | --- |
| `message.queued` | Tidewire accepted the message |
| `message.delivered` | The carrier confirmed delivery |
| `message.failed` | Delivery failed; see `error.code` |
| `contact.opted_out` | A contact replied STOP |

## Payload

```json
{
  "id": "evt_3kTn8Va",
  "type": "message.delivered",
  "created_at": "2026-11-02T16:04:11Z",
  "data": { "id": "msg_9Hc2Lr7Qx", "to": "+15550100", "status": "delivered" }
}
```

## Verifying signatures

Every request carries a `Tidewire-Signature` header: an HMAC-SHA256 of the raw body, signed with your webhook secret. Always check it before trusting the payload.

```js title="verify.js"
import crypto from "node:crypto";

export function isValid(rawBody, header, secret) {
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(header));
}
```

:::tip
Use the raw request body, exactly as received. Parsing the JSON and serializing it again changes the bytes, and the signature won't match.
:::

## Retries

If your endpoint doesn't answer with a `2xx` status within 10 seconds, Tidewire retries with growing gaps for up to three days. Events can arrive more than once or out of order, so use the event `id` to skip duplicates.
