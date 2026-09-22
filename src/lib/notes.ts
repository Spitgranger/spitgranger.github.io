export interface Note {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  draft: boolean;
  body: string;
  minutes: number;
}

// Deliberately small, flat metadata: one `key: value` per line, no YAML dependency.
export function parseNote(path: string, source: string): Note {
  const match = source.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing note metadata: ${path}`);
  const metadata = Object.fromEntries(match[1].split('\n').map(line => {
    const colon = line.indexOf(':');
    return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
  }));
  for (const key of ['title', 'summary', 'topic', 'status']) {
    if (!metadata[key]) throw new Error(`Missing ${key} in ${path}`);
  }
  if (!['draft', 'published'].includes(metadata.status)) throw new Error(`Invalid note status: ${path}`);
  return {
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: metadata.title, summary: metadata.summary, topic: metadata.topic,
    draft: metadata.status === 'draft', body: match[2].trim(),
    minutes: Math.max(1, Math.ceil(match[2].trim().split(/\s+/).length / 200)),
  };
}

const files = import.meta.glob('../content/notes/*.md', { eager: true, query: '?raw', import: 'default' });
export const notes = Object.entries(files).map(([path, source]) => parseNote(path, source as string));
