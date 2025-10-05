import { promises as fs } from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';
import type { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import accessibilityGapsSchema from '@crochet/schemas/accessibility-gaps.schema.json' assert { type: 'json' };
import contrastValidationSchema from '@crochet/schemas/contrast-validation.schema.json' assert { type: 'json' };

type SchemaKey = 'accessibility-gaps' | 'contrast-validation';

const schemaMap: Record<SchemaKey, Record<string, unknown>> = {
  'accessibility-gaps': accessibilityGapsSchema as Record<string, unknown>,
  'contrast-validation': contrastValidationSchema as Record<string, unknown>
};

export interface ValidationResult {
  valid: boolean;
  errors: ErrorObject[];
}

export function listSchemas(): SchemaKey[] {
  return Object.keys(schemaMap) as SchemaKey[];
}

export async function validateReport(schemaKey: SchemaKey, reportPath: string): Promise<ValidationResult> {
  const schema = schemaMap[schemaKey];
  if (!schema) {
    throw new Error(`Unknown schema: ${schemaKey}`);
  }

  const resolvedReportPath = path.resolve(process.cwd(), reportPath);
  const fileContents = await fs.readFile(resolvedReportPath, 'utf8');
  const data: unknown = JSON.parse(fileContents);

  const ajv = new Ajv({ strict: false, allErrors: true });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const valid = validate(data);

  return {
    valid: Boolean(valid),
    errors: validate.errors ?? []
  };
}

export type { SchemaKey };
