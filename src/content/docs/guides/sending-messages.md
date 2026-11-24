---
title: Sending messages
description: Templates, scheduling, character limits and per-country rules for outgoing messages.
sidebar:
  order: 1
---

A message needs two things: a recipient in E.164 format (`+15550100`) and a body. Everything else is optional.

## Character limits

A single message holds 160 plain characters, or 70 if it contains characters outside the GSM alphabet (such as accented letters in some languages, or symbols). Longer bodies are split into parts and joined again on the phone. The response tells you how many parts were used:

```json
{
  "id": "msg_9Hc2Lr7Qx",
  "parts": 2,
  "encoding": "gsm7"
}
```

## Using templates

Templates keep wording consistent and make translations easy. Create one in the dashboard, then send it with variables:

```json title="Request body"
{
  "to": "+15550100",
  "template": "table_ready",
  "variables": { "name": "Jordan", "party_size": 4 }
}
```

:::note
When you send a template, leave `body` out. Sending both returns `400` with the error code `body_and_template`.
:::

## Scheduling

Add `send_at` with an ISO 8601 time up to 30 days ahead. You can cancel a scheduled message until a minute before it's due.

```json
{ "to": "+15550100", "body": "Reminder: your appointment is tomorrow at 9:30 AM.", "send_at": "2026-12-01T14:30:00Z" }
```

## Quiet hours

By default Tidewire holds marketing messages between 9 PM and 8 AM in the recipient's time zone and sends them the next morning. Transactional messages, such as sign-in codes, are never held.

:::danger[Consent is required]
Only message people who agreed to hear from you. Tidewire records opt-outs automatically when someone replies STOP, and blocks further messages to that contact.
:::
