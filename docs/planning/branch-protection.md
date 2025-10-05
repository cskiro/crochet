# Branch Protection Notes

Date: 2025-10-05

## Current Settings (Observed)
- `main` requires pull requests but direct pushes are still possible (initial push bypassed rule: "Changes must be made through a pull request").
- Status checks (CI) are configured but not yet marked as required.

## Next Actions
1. Enforce "Require a pull request before merging" without allowing bypass for admins or direct pushes.
2. Mark `CI` workflow as a required status check after it stabilizes.
3. Enable "Require linear history" and "Require signed commits" if desired for provenance.
4. Re-run push via PR to verify enforcement after adjustments.
