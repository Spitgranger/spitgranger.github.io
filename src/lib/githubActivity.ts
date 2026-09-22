export interface Activity {
  id: string;
  repo: string;
  date: string;
  label: string;
  url: string;
}
export interface ActivitySnapshot {
  activities: Activity[];
  fetchedAt: number;
  capped: boolean;
}

const CACHE_KEY = 'richard-github-activity-v1';
const CACHE_TTL = 10 * 60 * 1000;
let pending: Promise<ActivitySnapshot> | undefined;

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? value as Record<string, unknown> : {};
}

export function normalizeEvents(events: unknown[]): Activity[] {
  return events.flatMap(value => {
    const event = object(value);
    const repo = object(event.repo).name;
    const payload = object(event.payload);
    if (event.public !== true || typeof event.id !== 'string' || typeof repo !== 'string' ||
        !/^[\w.-]+\/[\w.-]+$/.test(repo) || typeof event.created_at !== 'string' ||
        !Number.isFinite(Date.parse(event.created_at))) return [];
    const base = `https://github.com/${repo}`;
    let label: string;
    let url = base;
    const action = typeof payload.action === 'string' ? payload.action : '';
    const pull = object(payload.pull_request);
    const issue = object(payload.issue);
    const number = pull.number ?? payload.number ?? issue.number;
    const branch = typeof payload.ref === 'string' ? payload.ref.replace(/^refs\/heads\//, '') : '';
    switch (event.type) {
      case 'PushEvent':
        label = branch ? `Pushed to ${branch}` : 'Pushed code';
        if (typeof payload.head === 'string' && /^[a-f0-9]{40}$/i.test(payload.head)) url += `/commit/${payload.head}`;
        break;
      case 'PullRequestEvent':
        if (!['opened', 'closed', 'reopened'].includes(action)) return [];
        label = `${pull.merged === true ? 'Merged' : action === 'closed' ? 'Closed' : action === 'reopened' ? 'Reopened' : 'Opened'} a pull request`;
        if (typeof number === 'number') url += `/pull/${number}`;
        break;
      case 'IssuesEvent':
        if (!['opened', 'closed', 'reopened'].includes(action)) return [];
        label = `${action === 'opened' ? 'Opened' : action === 'closed' ? 'Closed' : 'Reopened'} an issue`;
        if (typeof number === 'number') url += `/issues/${number}`;
        break;
      case 'PullRequestReviewEvent':
      case 'PullRequestReviewCommentEvent':
        label = 'Reviewed a pull request';
        if (typeof number === 'number') url += `/pull/${number}`;
        break;
      case 'IssueCommentEvent':
        if (action !== 'created') return [];
        label = issue.pull_request ? 'Commented on a pull request' : 'Commented on an issue';
        if (typeof number === 'number') url += `/issues/${number}`;
        break;
      case 'CreateEvent':
        label = payload.ref_type === 'repository' ? 'Created the repository' : `Created a ${payload.ref_type === 'tag' ? 'tag' : 'branch'}${branch ? `: ${branch}` : ''}`;
        break;
      case 'ReleaseEvent':
        if (action !== 'published') return [];
        label = 'Published a release';
        url += '/releases';
        break;
      default: return [];
    }
    return [{ id: event.id, repo, date: event.created_at, label, url }];
  });
}

export function readActivityCache(): ActivitySnapshot | undefined {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && Number.isFinite(cached.fetchedAt) && typeof cached.capped === 'boolean' &&
        Array.isArray(cached.activities) && cached.activities.every((item: Activity) =>
          item && typeof item.id === 'string' && typeof item.repo === 'string' &&
          typeof item.label === 'string' && Number.isFinite(Date.parse(item.date)) &&
          typeof item.url === 'string' && item.url.startsWith('https://github.com/'))) return cached;
  } catch { /* Storage is optional. */ }
}

export function loadActivity(): Promise<ActivitySnapshot> {
  const cached = readActivityCache();
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) return Promise.resolve(cached);
  if (pending) return pending;
  pending = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const events: unknown[] = [];
      for (let page = 1; page <= 3; page++) {
        const response = await fetch(`https://api.github.com/users/Spitgranger/events/public?per_page=100&page=${page}`, {
          headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal,
        });
        if (!response.ok) {
          if (response.status === 403 || response.status === 429) throw new Error('GitHub is limiting requests. Please try again later.');
          throw new Error('GitHub activity is unavailable right now. Please try again later.');
        }
        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error('GitHub returned an unexpected response. Please try again later.');
        events.push(...data);
        if (data.length < 100) break;
      }
      const activities = [...new Map(normalizeEvents(events).map(item => [item.id, item])).values()]
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      const result = { activities, fetchedAt: Date.now(), capped: events.length >= 300 };
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(result)); } catch { /* Storage is optional. */ }
      return result;
    } catch (error) {
      if (controller.signal.aborted) throw new Error('GitHub took too long to respond. Please try again.');
      if (error instanceof TypeError) throw new Error('Couldn’t reach GitHub. Check your connection and try again.');
      throw error;
    } finally {
      window.clearTimeout(timeout);
      pending = undefined;
    }
  })();
  return pending;
}

export function summarizeActivity(activities: Activity[], now = new Date()) {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(today - (29 - i) * 86400000).toISOString().slice(0, 10), count: 0,
  }));
  const recent = activities.filter(item => item.date.slice(0, 10) >= days[0].date && Date.parse(item.date) <= now.getTime());
  const repos = new Map<string, number>();
  for (const item of recent) {
    const day = days.find(day => day.date === item.date.slice(0, 10));
    if (day) day.count++;
    repos.set(item.repo, (repos.get(item.repo) || 0) + 1);
  }
  return { days, recent, repos: [...repos.entries()].sort((a, b) => b[1] - a[1]) };
}
