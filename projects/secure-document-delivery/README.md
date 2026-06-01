# Secure Document Delivery Pipeline

**Automated password-protected document delivery with audit trails**

## Overview

End-to-end pipeline retrieving process record data, composing personalized emails, password-protecting PDF attachments, validating payloads, and logging activity.

## Key Metrics

- 10–15 min saved per send
- 100% automated PDF protection
- Pre-send validation gate
- Automatic audit logging

## Reusable Patterns

- User impersonation for sender-scoped API access
- Pre-send validation with hard/soft failure tiers
- Binary pipeline: download → encrypt → multipart upload
- Multi-tier password derivation with fallback chain
- Activity logging as first-class pipeline step

## My Contributions

- Authentication + impersonation flow
- Dynamic HTML email composer
- PDF encryption pipeline
- Validation engine design
- Multipart email delivery integration

## Technologies

n8n · JavaScript · REST APIs · PDF Encryption API · Multipart Uploads
