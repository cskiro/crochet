#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const schemasDir = resolve(rootDir, 'packages', 'schemas');
const examplesDir = resolve(rootDir, 'examples', 'reports');

const targets = [
  {
    schema: 'accessibility-gaps.schema.json',
    sample: 'accessibility-gaps.sample.json',
    description: 'Accessibility gaps report'
  }
];

const ajv = new Ajv({
  strict: false,
  allErrors: true
});
addFormats(ajv);

let hasErrors = false;

for (const target of targets) {
  const schemaPath = resolve(schemasDir, target.schema);
  const samplePath = resolve(examplesDir, target.sample);

  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
  const sample = JSON.parse(await readFile(samplePath, 'utf8'));

  const validate = ajv.compile(schema);
  const valid = validate(sample);

  if (!valid) {
    hasErrors = true;
    console.error(`\n❌ ${target.description} failed validation:`);
    for (const err of validate.errors ?? []) {
      console.error(` - ${err.instancePath || '<root>'} ${err.message}`);
    }
  } else {
    console.log(`✅ ${target.description} validated successfully`);
  }
}

if (hasErrors) {
  process.exitCode = 1;
  console.error('\nSchema validation failed.');
} else {
  console.log('\nAll schemas validated successfully.');
}
