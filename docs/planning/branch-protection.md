# Branch Protection Notes

Date: 2025-10-05

## Desired Settings
- Require pull requests before merging (no bypass for admins).
- Require status checks to pass before merging (CI workflow).
- Require linear history.
- Optionally require signed commits once release process stabilizes.

## Action Items
1. In GitHub UI (`Settings` → `Branches` → `Branch protection rules`), edit the `main` rule:
   - Enable **Require a pull request before merging** and uncheck "Allow force pushes" and "Allow deletions".
   - Check **Require approvals** (1+) and **Dismiss stale pull request approvals**.
   - Enable **Require status checks to pass before merging** and select the `CI` workflow.
   - Enable **Require linear history**.
2. Re-run a test PR to ensure direct pushes are blocked (current pushes still bypass the rule, as seen on `git push`).
3. Document enforcement status once confirmed.

> Note: The automation environment cannot modify GitHub settings directly; these steps must be completed through the repository settings interface.
