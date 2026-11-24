---
title: Overview
description: Base URL, request format, errors, pagination and rate limits for the Tidewire API.
sidebar:
  order: 1
---

The Tidewire API is organized around REST. It accepts JSON request bodies, returns JSON responses and uses standard HTTP status codes.

```text
https://api.tidewire.example/v1
```

## Versions

Requests use your account's default API version unless you send the `Tidewire-Version` header. The current version is `2026-10-01`. Read more in [Versioning](/resources/versioning/).

## Errors

| Status | Meaning |
| --- | --- |
| `400` | The request was malformed or a parameter is invalid |
| `401` | The API key is missing, wrong or revoked |
| `403` | The key doesn't have permission for this action |
| `404` | The resource doesn't exist |
| `409` | The request conflicts with the resource's current state |
| `429` | Too many requests; slow down and retry |
| `5xx` | Something went wrong on our side; retry with backoff |

Error bodies always have the same shape:

```json
{
  "error": {
    "type": "invalid_request",
    "code": "invalid_phone_number",
    "message": "The number +1555 is not a valid E.164 phone number.",
    "param": "to"
  }
}
```

## Pagination

List endpoints return up to 25 items by default (`limit` accepts 1 to 100) and a `next_cursor`. Pass it as `cursor` to fetch the next page. When `next_cursor` is `null`, you've reached the end.

## Rate limits

Live keys can make 100 requests a second, test keys 25. Every response includes `RateLimit-Remaining` and `RateLimit-Reset` headers. When you get `429`, wait for the number of seconds in `Retry-After`.

## Idempotency

Send an `Idempotency-Key` header with any `POST` request. If the network drops and you retry with the same key within 24 hours, Tidewire returns the original result instead of sending the message twice.
