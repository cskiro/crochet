/**
 * Schema for WCAG 2.2 Level AA accessibility audit reports
 */
export interface AccessibilityGapsReportSchema {
  /**
   * JSON Schema reference
   */
  $schema?: string;
  meta: {
    /**
     * Project name
     */
    project: string;
    /**
     * Date of audit (YYYY-MM-DD)
     */
    auditDate: string;
    /**
     * Person or tool that performed the audit
     */
    auditor: string;
    /**
     * Audit protocol version (semver)
     */
    protocolVersion: string;
    /**
     * WCAG version used for audit
     */
    wcagVersion: "2.0" | "2.1" | "2.2";
    /**
     * Target WCAG conformance level
     */
    wcagLevel: "A" | "AA" | "AAA";
    /**
     * Known limitations of the audit
     */
    limitations?: string[];
    /**
     * Primary method used to detect issues
     */
    detectionMethod: "manual-code-review" | "automated-static" | "automated-runtime" | "automated-e2e" | "combined";
    [k: string]: unknown;
  };
  summary: {
    /**
     * Total WCAG criteria evaluated
     */
    totalCriteria: number;
    /**
     * Number of passing criteria
     */
    passing: number;
    /**
     * Number of failing criteria
     */
    failing: number;
    /**
     * Number of N/A criteria
     */
    notApplicable: number;
    /**
     * Compliance percentage (passing / applicable)
     */
    compliancePercentage: number;
    /**
     * Additional context for summary
     */
    note?: string;
    severityBreakdown?: {
      critical?: number;
      high?: number;
      medium?: number;
      low?: number;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  findings: {
    /**
     * Unique finding ID (WCAG-{criterion}-{sequence})
     */
    id: string;
    /**
     * WCAG success criterion number
     */
    criterion: string;
    /**
     * Human-readable criterion name
     */
    criterionName: string;
    /**
     * WCAG level for this criterion
     */
    wcagLevel: "A" | "AA" | "AAA";
    /**
     * Finding status
     */
    status: "pass" | "fail" | "manual-required";
    /**
     * Impact severity
     */
    severity: "critical" | "high" | "medium" | "low";
    /**
     * Detailed description of the issue
     */
    description: string;
    /**
     * List of affected files with line numbers
     */
    affectedFiles: string[];
    evidence: {
      /**
       * Code snippet showing the issue
       */
      codeSnippet?: string;
      /**
       * Affected line numbers
       */
      lineNumbers?: number[];
      /**
       * How the issue was detected
       */
      detectionMethod: "manual" | "eslint" | "axe" | "playwright" | "other";
      /**
       * Path to screenshot evidence
       */
      screenshot?: string;
      [k: string]: unknown;
    };
    /**
     * User impact description
     */
    impact?: string;
    /**
     * Likelihood of users encountering this
     */
    likelihood?: string;
    /**
     * Explanation of severity rating
     */
    severityJustification?: string;
    /**
     * Link to WCAG documentation
     */
    wcagReference: string;
    remediation: {
      /**
       * How to fix the issue
       */
      description: string;
      /**
       * Example code showing the fix
       */
      codeExample?: string;
      /**
       * Estimated time to fix
       */
      estimatedEffort: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }[];
  notApplicableCriteria?: {
    /**
     * WCAG criterion number
     */
    id: string;
    /**
     * Criterion name
     */
    name: string;
    /**
     * Why this criterion is N/A
     */
    reason: string;
    [k: string]: unknown;
  }[];
  passingCriteria?: {
    /**
     * WCAG criterion number
     */
    id: string;
    /**
     * Criterion name
     */
    name: string;
    /**
     * Why/how this criterion passes
     */
    reason: string;
    [k: string]: unknown;
  }[];
  /**
   * Additional context and recommendations
   */
  additionalNotes?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
