import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiGitBranch, FiGithub } from 'react-icons/fi';
import { loadActivity, readActivityCache, summarizeActivity } from '../lib/githubActivity';

export default function GithubActivity() {
  const [snapshot, setSnapshot] = useState(readActivityCache);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    loadActivity().then(result => { if (active) setSnapshot(result); })
      .catch((cause: Error) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [attempt]);

  const { days, recent, repos } = summarizeActivity(snapshot?.activities || []);
  const max = Math.max(1, ...days.map(day => day.count));
  return (
    <section id="activity" className="activity-section" aria-labelledby="activity-title">
      <div className="section-heading">
        <h2 id="activity-title">Lately on GitHub</h2>
        <a className="text-link" href="https://github.com/Spitgranger" target="_blank" rel="noopener noreferrer">View profile <FiArrowUpRight /></a>
      </div>
      <div className="activity-panel" aria-busy={loading}>
        <div role="status" className="activity-status">
          {loading && <p>{snapshot ? 'Updating public activity…' : 'Loading public activity…'}</p>}
          {error && <p>{error} {snapshot && 'Showing previously saved activity.'} <button className="activity-retry" onClick={() => setAttempt(value => value + 1)} disabled={loading}>Try again</button></p>}
        </div>
        {snapshot && <>
          <div className="activity-summary"><FiGithub aria-hidden="true" /><p><strong>{recent.length} public activity {recent.length === 1 ? 'event' : 'events'}</strong><span>across {repos.length} {repos.length === 1 ? 'repository' : 'repositories'} · past 30 days</span></p></div>
          <div className="activity-chart" role="list" aria-label="Public activity by day, UTC">
            {days.map(day => <div key={day.date} role="listitem" aria-label={`${day.date}: ${day.count} events`} title={`${day.date}: ${day.count} public activity events`}><span style={{ height: `${day.count ? Math.max(12, day.count / max * 100) : 4}%` }} className={day.count ? 'has-activity' : ''} /></div>)}
          </div>
          <div className="activity-chart-labels"><span>{days[0].date}</span><span>Today · UTC</span></div>
          {recent.length ? <div className="activity-details">
            <div><h3>Contributing to</h3><ul className="activity-repos">{repos.map(([repo, count]) => <li key={repo}><a href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer"><FiGitBranch aria-hidden="true" /><span>{repo}</span><small>{count} {count === 1 ? 'event' : 'events'}</small></a></li>)}</ul></div>
            <div><h3>Recent contributions</h3><ul className="activity-feed">{recent.slice(0, 6).map(item => <li key={item.id}><a href={item.url} target="_blank" rel="noopener noreferrer"><span>{item.label}<FiArrowUpRight aria-hidden="true" /></span><small>{item.repo}</small></a><time dateTime={item.date} title={new Date(item.date).toUTCString()}>{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' })}</time></li>)}</ul></div>
          </div> : <p className="activity-empty">No public contributions returned for the past 30 days. You can still explore my projects on GitHub.</p>}
          <p className="activity-footnote">Public pushes, pull requests, issues, reviews, releases, and repository or branch creation. Counts are events, not individual commits. GitHub’s feed may be delayed or incomplete{snapshot.capped ? '; the latest 300 events were retrieved' : ''}. Updated <time dateTime={new Date(snapshot.fetchedAt).toISOString()}>{new Date(snapshot.fetchedAt).toLocaleString()}</time>.</p>
        </>}
      </div>
    </section>
  );
}
