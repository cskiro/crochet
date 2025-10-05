#!/usr/bin/env node
import { Command } from 'commander';
import { loadProtocol, summarizeProtocol } from './protocol.js';
import { listSchemas, validateReport, type SchemaKey } from './schema.js';

const program = new Command();
const availableSchemas = listSchemas();

interface ProtocolInfoOptions {
  path: string;
}

interface SchemaValidateOptions {
  schema: SchemaKey;
}

function writeLine(message: string): void {
  process.stdout.write(`${message}\n`);
}

program
  .name('crochet')
  .description('Accessibility audit automation utilities')
  .version('0.0.0');

program
  .command('protocol-info')
  .description('Print metadata about the accessibility audit protocol')
  .option('-p, --path <path>', 'Path to protocol YAML', 'docs/protocols/ACCESSIBILITY_AUDIT.yaml')
  .action(async (options: ProtocolInfoOptions) => {
    try {
      const protocol = await loadProtocol(options.path);
      const summary = summarizeProtocol(protocol);
      const output = {
        name: summary.name,
        version: summary.version,
        standard: summary.standard,
        lastUpdated: summary.lastUpdated
      };
      writeLine(JSON.stringify(output, null, 2));
    } catch (error) {
      console.error(`Failed to load protocol: ${(error as Error).message}`);
      process.exitCode = 1;
    }
  });

program
  .command('schema-validate')
  .argument('<report>', 'Path to accessibility report JSON file')
  .option('-s, --schema <name>', `Schema key (${availableSchemas.join(', ')})`, 'accessibility-gaps')
  .description('Validate an accessibility report against a Crochet schema')
  .action(async (report: string, options: SchemaValidateOptions) => {
    try {
      const schemaKey = options.schema;
      if (!availableSchemas.includes(schemaKey)) {
        throw new Error(`Unknown schema: ${schemaKey}. Available schemas: ${availableSchemas.join(', ')}`);
      }

      const result = await validateReport(schemaKey, report);
      if (!result.valid) {
        console.error('Report failed validation:');
        for (const err of result.errors) {
          console.error(` - ${err.instancePath || '<root>'} ${err.message}`);
        }
        process.exitCode = 1;
      } else {
        writeLine('Report is valid ✅');
      }
    } catch (error) {
      console.error(`Validation failed: ${(error as Error).message}`);
      process.exitCode = 1;
    }
  });

program
  .command('schema-list')
  .description('List available schemas')
  .action(() => {
    availableSchemas.forEach((schema) => {
      writeLine(schema);
    });
  });

program.parseAsync(process.argv).catch((error) => {
  console.error(`Unexpected error: ${(error as Error).message}`);
  process.exitCode = 1;
});

export { loadProtocol, summarizeProtocol } from './protocol.js';
export { listSchemas, validateReport } from './schema.js';
