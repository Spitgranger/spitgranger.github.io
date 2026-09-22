const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const code = ts.transpileModule(fs.readFileSync('src/lib/githubActivity.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
function setup(fetch) {
  const storage = new Map();
  const context = { exports: {}, fetch, AbortController, window: { setTimeout, clearTimeout },
    localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) } };
  vm.runInNewContext(code, context);
  return context.exports;
}
function event(id, type = 'PushEvent', payload = {}) {
  return { id, type, public: true, repo: { name: 'Spitgranger/example' }, created_at: '2026-09-21T12:00:00Z', payload };
}
test('normalizes current push payloads without inventing commit counts; filters private and non-contribution events', () => {
  const api = setup();
  const result = api.normalizeEvents([
    event('1', 'PushEvent', { ref: 'refs/heads/main', head: 'a'.repeat(40) }),
    event('2', 'WatchEvent'), event('3', 'ForkEvent'), { ...event('4'), public: false },
    event('5', 'PullRequestEvent', { action: 'closed', number: 42, pull_request: { merged: true } }),
    { ...event('6'), repo: { name: 'bad/path/extra' } },
  ]);
  assert.equal(result.length, 2);
  assert.equal(result[0].label, 'Pushed to main');
  assert.equal(result[0].url, `https://github.com/Spitgranger/example/commit/${'a'.repeat(40)}`);
  assert.equal(result[1].label, 'Merged a pull request');
  assert.equal(result[1].url, 'https://github.com/Spitgranger/example/pull/42');
});
test('summary uses 30 UTC days, excludes old and future events, and groups repositories', () => {
  const api = setup();
  const items = api.normalizeEvents([event('1'), event('2'),
    { ...event('3'), created_at: '2026-08-22T23:59:59Z' },
    { ...event('4'), created_at: '2026-09-22T00:00:00Z' }]);
  const result = api.summarizeActivity(items, new Date('2026-09-21T15:00:00Z'));
  assert.equal(result.days.length, 30);
  assert.equal(result.days[0].date, '2026-08-23');
  assert.equal(result.recent.length, 2);
  assert.equal(result.days[29].count, 2);
  assert.equal(result.repos[0][1], 2);
});
test('paginates, deduplicates and coalesces requests, then serves fresh cache', async () => {
  let calls = 0;
  const api = setup(async () => ({ ok: true, json: async () => ++calls === 1
    ? Array.from({ length: 100 }, (_, i) => event(String(i))) : [event('0'), event('100')] }));
  const [a, b] = await Promise.all([api.loadActivity(), api.loadActivity()]);
  assert.equal(calls, 2);
  assert.equal(a.activities.length, 101);
  assert.equal(b.activities.length, 101);
  await api.loadActivity();
  assert.equal(calls, 2);
});
test('reports rate limits without storing a false empty result and permits retry', async () => {
  let fail = true;
  const api = setup(async () => fail ? { ok: false, status: 403 } : { ok: true, json: async () => [] });
  await assert.rejects(api.loadActivity(), /limiting requests/);
  assert.equal(api.readActivityCache(), undefined);
  fail = false;
  assert.equal((await api.loadActivity()).activities.length, 0);
});
