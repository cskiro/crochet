# Crochet Accessibility Toolkit

Modern, LLM-ready accessibility auditing utilities for WCAG 2.2 Level AA compliance.

## Status

🚧 Core protocol, schemas, and sample assets imported. CLI + automation are under active development.

## Getting Started

1. Install dependencies (pnpm recommended):
   ```bash
   pnpm install
   ```
2. Run quality checks:
   ```bash
   pnpm lint
   pnpm test
   pnpm typecheck
   ```

## CLI (Experimental)

Build and run the Crochet command-line interface:

```bash
pnpm install           # builds the CLI during prepare
pnpm run crochet schema-list
pnpm run crochet schema-validate examples/reports/accessibility-gaps.sample.json
```

The CLI currently supports protocol inspection (`crochet protocol-info`) and JSON schema validation (`crochet schema-validate`). Use `pnpm cli:build` if you need to regenerate the bundle manually.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow details and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for community guidelines.

## Security

Report vulnerabilities privately using the process in [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE)
