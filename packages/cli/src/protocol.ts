import { promises as fs } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export interface ProtocolMetadata {
  protocol_metadata?: {
    name?: string;
    version?: string;
    target_standard?: {
      name?: string;
      level?: string;
    };
    protocol_last_updated?: string;
  };
  severity_rubric?: unknown;
  required_tooling?: unknown;
}

export interface ProtocolSummary {
  name: string;
  version: string;
  standard: string;
  lastUpdated: string;
}

export async function loadProtocol(protocolPath: string): Promise<ProtocolMetadata> {
  const resolved = path.resolve(process.cwd(), protocolPath);
  const raw = await fs.readFile(resolved, 'utf8');
  return YAML.parse(raw) as ProtocolMetadata;
}

export function summarizeProtocol(protocol: ProtocolMetadata): ProtocolSummary {
  const meta = protocol.protocol_metadata ?? {};
  const target = meta.target_standard ?? {};
  return {
    name: meta.name ?? 'Unknown protocol',
    version: meta.version ?? 'Unknown version',
    standard: target.name ? `${target.name} ${target.level ?? ''}`.trim() : 'Unknown standard',
    lastUpdated: meta.protocol_last_updated ?? 'Unknown date'
  };
}
