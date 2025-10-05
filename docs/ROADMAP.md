# Crochet Accessibility Toolkit Roadmap

## Overview

Transform the Heisenberg accessibility audit workflow into a reusable, public utility that ships opinionated WCAG 2.2 Level AA automation, documentation, and tooling.

## Phase 0 – Context Capture ✅ (Completed 2025-10-04)
- Cloned source repo artifacts (audit reports, protocol YAML, schemas).
- Exported reusable knowledge so future runs do not rely on hidden paths.
- Inventoried accessibility assets (automation scripts, manual checklists, remediation plans, contrast results).
- Established success metrics and non-goals for the public utility.

## Phase 1 – Repository Foundation ✅ (Completed 2025-10-05)
- Scaffolded public repo structure (`packages/`, `docs/`, `.github/`, `examples/`, `.changeset/`).
- Committed workspace tooling: pnpm workspace, TypeScript base config, ESLint/Vitest configs, CI workflow skeleton.
- Added governance artifacts: README, LICENSE, Code of Conduct, CONTRIBUTING, SECURITY policy, issue/PR templates, CODEOWNERS.
- Documented roadmap plus internal planning notes (`docs/planning/*`).
- Deferred: replace placeholder contact info once the proof of concept matures.

### Phase 1 Success Criteria (Met)
- ✅ CI (`pnpm lint`, `pnpm test --passWithNoTests`, `pnpm typecheck`) passes on main.
- ✅ Governance docs in place; outstanding contact placeholders tracked for later.
- ✅ Roadmap and planning docs captured in version control.
- ✅ Internal planning artifacts established instead of GitHub Issues for initial execution.

## Phase 2 – Protocol & Packaging (Next)
- Relocate the WCAG audit protocol into `packages/protocols/` with templated project metadata.
- Normalize JSON schemas in `packages/schemas/`, publish TypeScript types, and add validation test harness.
- Extract manual checklists and testing guides into `docs/playbooks/` with W3C references.
- Provide anonymized example outputs (`examples/heisenberg/`) for JSON + Markdown reports.

## Phase 3 – CLI & Automation
- Scaffold CLI package (`packages/cli`) to orchestrate protocol execution, schema validation, and report generation.
- Implement framework adapters (React/MUI baseline) via dependency inversion.
- Integrate Vitest coverage for core modules and golden snapshot tests for sample audits.
- Wire Playwright + `@axe-core/playwright` smoke suite gated by CI flag.
- Publish reusable GitHub Action to run CLI in consumer pipelines.

## Phase 4 – Documentation & Education
- Stand up docs site (Docusaurus) with quick start, architecture overview, troubleshooting, and learning resources.
- Author protocol deep-dive, severity rubric explanation, and update policy for WCAG revisions.
- Create end-to-end onboarding tutorial, including sample CI configuration and remediation workflow guidance.

## Phase 5 – Release & Adoption
- Finalize semantic versioning strategy, Changesets workflow, and release notes templates.
- Publish npm packages (`@crochet/cli`, `@crochet/protocols`, `@crochet/schemas`, adapters) with provenance.
- Enable automated Dependabot/Renovate, CodeQL/Semgrep scans, and nightly regression audit workflow.
- Execute launch plan: announcement blog, community outreach, inclusion in accessibility resource lists.

## Phase 6 – Iterative Enhancements
- Add remediation plan generator producing Jira-ready tasks mapped to WCAG criteria.
- Ship optional dashboard for report visualization and trend tracking.
- Expand adapter ecosystem (Angular, Vue, Web Components) and encourage community contributions.
- Maintain quarterly protocol review cadence aligned with WCAG updates; run audits on toolkit artifacts themselves.

