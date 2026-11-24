---
title: Changelog
description: Notable changes to the Tidewire API and libraries.
sidebar:
  order: 2
---

## 2026-10-01

- **New:** `send_at` lets you schedule messages up to 30 days ahead.
- **New:** `DELETE /v1/messages/{id}` cancels scheduled messages.
- **Changed:** `status` on messages can now be `scheduled` or `canceled`. Code that only expects the old values should be updated before upgrading.

## 2026-04-15

- **New:** Restricted keys with per-resource permissions.
- **New:** `contact.opted_out` webhook event.
- **Improved:** List endpoints accept `limit` up to 100.

## 2025-11-03

- First public release of the Messages, Contacts and Webhooks APIs.
