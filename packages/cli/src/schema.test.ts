import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateReport, listSchemas } from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../..');

describe('schema validation', () => {
  it('validates the sample accessibility gaps report', async () => {
    const samplePath = path.resolve(repoRoot, 'examples/reports/accessibility-gaps.sample.json');
    const result = await validateReport('accessibility-gaps', samplePath);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('lists known schemas', () => {
    expect(listSchemas()).toEqual(['accessibility-gaps', 'contrast-validation']);
  });
});
