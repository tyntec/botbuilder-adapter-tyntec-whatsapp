# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Support for processing postback messages to `TyntecWhatsAppAdapter#processActivity`.
- A `TyntecWhatsAppAdapter#parseTyntecWebhookRequest` as a drop-in replacement for the `TyntecWhatsAppAdapter#parseTyntecWhatsAppMessageEvent`.
### Deprecated
- The `TyntecWhatsAppAdapter#parseTyntecWhatsAppMessageEvent`. Use `TyntecWhatsAppAdapter#parseTyntecWebhookRequest` instead.

## [1.2.0]
### Fixed
- The `ITyntecWhatsAppTemplateLocationHeaderComponent` now correctly uses `type: "location"` and a property `location`
  for the payload.

## [1.1.0]
### Added
- Support for processing contacts messages to `TyntecWhatsAppAdapter#processActivity`.
- Support for processing location messages to `TyntecWhatsAppAdapter#processActivity`.
- Support for processing voice messages to `TyntecWhatsAppAdapter#processActivity`.
- Support for sending contacts messages to `TyntecWhatsAppAdapter#sendActivities`.
- Support for sending interactive messages to `TyntecWhatsAppAdapter#sendActivities`.
- Support for sending location messages to `TyntecWhatsAppAdapter#sendActivities`.
