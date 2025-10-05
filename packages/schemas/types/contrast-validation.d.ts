/**
 * Schema for documenting color contrast validation against WCAG 2.2 standards
 */
export interface WCAGContrastValidationReport {
  /**
   * JSON Schema reference
   */
  $schema?: string;
  /**
   * Date validation was performed (YYYY-MM-DD)
   */
  validationDate: string;
  /**
   * WCAG version targeted
   */
  wcagTarget: "2.0" | "2.1" | "2.2";
  /**
   * Target WCAG compliance level
   */
  complianceLevel: "A" | "AA" | "AAA";
  /**
   * Method used to calculate contrast ratios
   */
  methodology: string;
  /**
   * Tool or process used for validation
   */
  validator?: string;
  /**
   * List of color combinations validated
   */
  colors: {
    /**
     * Descriptive name for the color combination
     */
    name: string;
    /**
     * Foreground color (hex or rgba)
     */
    foreground: string;
    /**
     * Background color (hex or rgba)
     */
    background: string;
    /**
     * Calculated contrast ratio (1:1 to 21:1)
     */
    contrastRatio: number;
    /**
     * Where this color combination is used
     */
    useCases?: string[];
    wcagCompliance: {
      aa: {
        /**
         * Meets AA for normal text (4.5:1)
         */
        normalText: boolean;
        /**
         * Meets AA for large text (3:1)
         */
        largeText: boolean;
        [k: string]: unknown;
      };
      aaa: {
        /**
         * Meets AAA for normal text (7:1)
         */
        normalText: boolean;
        /**
         * Meets AAA for large text (4.5:1)
         */
        largeText: boolean;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * Overall pass/fail for target compliance level
     */
    status: "pass" | "fail";
    /**
     * Additional notes or context
     */
    notes?: string;
    [k: string]: unknown;
  }[];
  /**
   * Component-specific contrast validations
   */
  components?: {
    /**
     * Component name
     */
    component: string;
    /**
     * Text color used
     */
    textColor: string;
    /**
     * Background color used
     */
    backgroundColor: string;
    contrastRatio: number;
    status: "pass" | "fail";
    complianceLevel?: "A" | "AA" | "AAA";
    [k: string]: unknown;
  }[];
  summary: {
    /**
     * Total number of color combinations tested
     */
    totalColorsValidated: number;
    /**
     * Number meeting AA standards
     */
    aaCompliant: number;
    /**
     * Number meeting AAA standards
     */
    aaaCompliant?: number;
    /**
     * Number of combinations failing target level
     */
    violations: number;
    /**
     * Overall validation status
     */
    status: "pass" | "fail";
    [k: string]: unknown;
  };
  /**
   * URL for manual verification (e.g., WebAIM)
   */
  manualVerificationUrl?: string;
  /**
   * Reference URLs and file paths
   */
  references?: string[];
  [k: string]: unknown;
}
