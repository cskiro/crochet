# Contributing to Crochet

Thanks for your interest in improving the accessibility audit toolkit! We welcome contributions from the community and want to make participation as smooth as possible.

## Ground Rules

- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Discuss significant changes via an issue before opening a pull request.
- Keep pull requests focused. Smaller, well-scoped changes are easier to review.
- Ensure CI checks (lint, tests, type checking) pass before requesting review.

## Development Workflow

1. **Fork and Clone** the repository.
2. **Install dependencies** using pnpm:
   ```bash
   pnpm install
   ```
3. **Create a branch**: `git checkout -b feat/your-change`.
4. **Add or update tests** alongside your code changes.
5. **Run checks locally**:
   ```bash
   pnpm lint
   pnpm test
   pnpm typecheck
   ```
6. **Commit** using descriptive messages.
7. **Push** your branch and open a pull request against `main`.

## Commit & PR Guidelines

- Use semantic commit messages where possible (e.g., `feat: add contrast validation schema`).
- Include context in the PR description: motivation, implementation summary, test coverage.
- Reference related issues with `Fixes #123` or `Refs #456`. 
- Add documentation updates when behavior changes.

## Testing

- Write unit tests in Vitest to cover new logic.
- Add integration tests or Playwright scripts when user flows are affected.
- Ensure accessibility linting rules remain green.

## Releases

- Changesets manage package versioning. Run `pnpm changeset` for user-facing changes.
- Maintainers trigger releases from `main` using the automated workflow.

## Questions?

Open a GitHub Discussion or reach out via the contact listed in [SECURITY.md](./SECURITY.md) for sensitive reports.
