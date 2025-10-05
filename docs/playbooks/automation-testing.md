# Accessibility Testing Guide

## Overview

This project uses automated accessibility testing with `@axe-core/playwright` to ensure WCAG 2.1 AA compliance. While automated testing catches many common issues, manual testing is still required for complete coverage.

## Running Accessibility Tests

### Quick Start

```bash
# Run all accessibility tests
npm run test:a11y

# Run with UI for debugging
npm run test:a11y:ui

# Generate HTML report
npm run test:a11y:report
```

### What Gets Tested

Our accessibility suite (`e2e/tests/accessibility.spec.ts`) covers:

- Home page and search interface
- Search results and suggestions
- Drug detail view (all tabs)
- Keyboard navigation flow
- Error states and announcements
- Focus management on dynamic content

Additionally, specific components have targeted tests:

- Therapeutic alternatives panel (`e2e/tests/therapeutic-alternatives.spec.ts`)

## Understanding Results

### Violation Severity Levels

- **Critical**: Blocks access to content (test fails immediately)
- **Serious**: Significantly impacts users (test fails immediately)
- **Moderate**: May cause difficulties (warning logged, test continues)
- **Minor**: Small impact (warning logged, test continues)

### Reading Test Output

When violations are found, you'll see:

```text
[CRITICAL] Images must have alternate text
  Help: https://dequeuniversity.com/rules/axe/4.0/image-alt
  Affected elements: 2
    - img#logo
    - img.drug-image
```

### Accessing Detailed Reports

Test results are automatically attached to the Playwright report:

1. Run tests with `npm run test:a11y:report`
2. Open the HTML report
3. Click on failed tests to see attached JSON with full violation details

## Adding Accessibility Tests

### For New Features

When adding new UI components:

1. Add accessibility attributes during development:

   ```tsx
   <button aria-label="Close dialog">×</button>
   ```

2. Test the component in isolation:

   ```typescript
   import { checkComponentAccessibility } from '../fixtures/accessibility';

   const results = await checkComponentAccessibility(page, '[data-testid="my-component"]');
   ```

### For Existing Components

To add accessibility checks to existing tests:

```typescript
import { checkAccessibility, assertNoSeriousViolations } from '../fixtures/accessibility';

test('my feature test', async ({ page }, testInfo) => {
  // Your existing test code...

  // Add accessibility check
  const results = await checkAccessibility(page, testInfo);
  assertNoSeriousViolations(results);
});
```

## Manual Testing Checklist

Automated testing cannot catch everything. Manually verify:

### Keyboard Navigation

- [ ] All interactive elements reachable via Tab
- [ ] Tab order follows visual flow
- [ ] Escape closes modals/dropdowns
- [ ] Enter/Space activate buttons
- [ ] Arrow keys work in menus/lists

### Screen Reader Testing

- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] All content is announced correctly
- [ ] Dynamic changes are announced
- [ ] Form errors are announced
- [ ] Loading states are announced

### Visual Testing

- [ ] Zoom to 200% - content remains usable
- [ ] High contrast mode - all content visible
- [ ] Color alone doesn't convey information
- [ ] Focus indicators clearly visible
- [ ] Touch targets at least 44×44 pixels

### Motion and Timing

- [ ] Animations can be paused/stopped
- [ ] No content flashes more than 3 times/second
- [ ] Time limits can be extended
- [ ] Auto-updating content can be paused

## Common Issues and Fixes

### Missing Alt Text

```tsx
// Bad
<img src="drug.png" />

// Good
<img src="drug.png" alt="Aspirin 81mg tablet" />
```

### Missing Form Labels

```tsx
// Bad
<input type="text" placeholder="Search" />

// Good
<input type="text" aria-label="Search for drugs" placeholder="Search" />
```

### Poor Focus Management

```tsx
// After modal opens, focus the modal
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);
```

### Missing ARIA Labels

```tsx
// Bad
<button>×</button>

// Good
<button aria-label="Close">×</button>
```

## CI Integration

Accessibility tests run in CI but are currently **non-blocking** while we address the baseline violations. To see results:

1. Check the GitHub Actions workflow output
2. Download artifacts for detailed violation reports
3. Create issues for new violations

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe Rule Descriptions](https://dequeuniversity.com/rules/axe/4.0)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

## Getting Help

- For test failures: Check the detailed report and rule documentation
- For implementation questions: Refer to ARIA Authoring Practices
- For new patterns: Discuss in PR before implementing

Remember: **Accessibility is not optional**. When in doubt, prioritize user access over aesthetics.
