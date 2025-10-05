# Developer Setup (Phase 1)

## Prerequisites
- Node.js 20 LTS
- pnpm 9 (`corepack enable pnpm` or Homebrew install)

## First-Time Install
```bash
pnpm install
```

## Common Scripts
```bash
pnpm lint             # ESLint 9 linting (no files yet, succeeds due to placeholder script)
pnpm test             # Vitest with --passWithNoTests flag until suites exist
pnpm typecheck        # TypeScript strict mode, includes src/ and packages/
pnpm format           # Prettier check (read-only)
```

## Notes
- `src/index.ts` is a placeholder to satisfy TypeScript until real packages land.
- Update `package.json` scripts as new tooling (Playwright, Changesets) is introduced in later phases.
- Use Node 20+ to avoid ESM/CommonJS resolution warnings in ESLint 9.
