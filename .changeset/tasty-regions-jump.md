---
'@asgardeo/javascript': patch
---

Fix multiple logic and error-handling issues in core SDK modules to align with expected behavior.

- Use numeric ordering for log levels instead of string comparison.
- Handle network and parsing errors gracefully in getUserInfo.
- Improve error handling for invalid URLs and network failures in embedded sign-in and sign-up flows.
