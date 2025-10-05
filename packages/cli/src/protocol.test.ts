import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { loadProtocol, summarizeProtocol } from './protocol.js';

describe('protocol utilities', () => {
  it('loads and summarizes the protocol metadata', async () => {
    const protocolPath = path.resolve(process.cwd(), 'docs/protocols/ACCESSIBILITY_AUDIT.yaml');
    const protocol = await loadProtocol(protocolPath);
    const summary = summarizeProtocol(protocol);

    expect(summary.name).toContain('WCAG');
    expect(summary.version).toMatch(/\d+\.\d+\.\d+/);
  });
});
