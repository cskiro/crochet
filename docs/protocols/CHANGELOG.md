# WCAG Accessibility Audit Protocol – Changelog

## 2.0.0 (2025-10-04)
- Replaced grep-based automation with tooling-aware instructions (ESLint, vitest-axe, @axe-core/playwright).
- Introduced impact × likelihood severity rubric instead of mapping to WCAG conformance levels.
- Added JSON schema references for gap and remediation reports.
- Corrected several WCAG interpretations (1.3.5, 1.4.4, 2.4.5, 2.5.8, 3.2.6, 4.1.3).
- Documented framework awareness for MUI to eliminate false positives (icon aria-hidden, alert roles, etc.).

## 1.0.0 (2025-09-24)
- Initial release of the accessibility audit protocol.
- Relied on grep-based heuristics; superseded by v2.0.0.
