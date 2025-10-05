import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import type { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';

type SchemaKey = 'accessibility-gaps' | 'contrast-validation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaMap: Record<SchemaKey, string> = {
  'accessibility-gaps': 'accessibility-gaps.schema.json',
  'contrast-validation': 'contrast-validation.schema.json'
};

async function loadSchema(schemaKey: SchemaKey): Promise<Record<string, unknown>> {
  const schemaFileName = schemaMap[schemaKey];
  if (!schemaFileName) {
    throw new Error(`Unknown schema: ${schemaKey}`);
  }

  // Navigate from dist/ to packages/schemas/
  const schemaPath = path.resolve(__dirname, '../../schemas', schemaFileName);
  const schemaContent = await fs.readFile(schemaPath, 'utf8');
  return JSON.parse(schemaContent) as Record<string, unknown>;
}

export interface ValidationResult {
  valid: boolean;
  errors: ErrorObject[];
}

export function listSchemas(): SchemaKey[] {
  return Object.keys(schemaMap) as SchemaKey[];
}

export async function validateReport(schemaKey: SchemaKey, reportPath: string): Promise<ValidationResult> {
  const schema = await loadSchema(schemaKey);

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
