import { lazy, Suspense, useEffect, useState } from 'react';
import Writing from './Components/Writing';
import './App.css';
import Header from './Components/Header';
import About from './Components/About';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import GithubActivity from './Components/GithubActivity';

const NotePage = lazy(() => import('./Components/NotePage'));

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  const isNote = hash.startsWith('#/writing/');
  useEffect(() => {
    if (!isNote && hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash, isNote]);
  return (
    <>
      <div className="ambient-background" aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" className="page-shell">
        {isNote ? <Suspense fallback={<p className="note-page" role="status">Opening note…</p>}><NotePage slug={hash.slice(10)} /></Suspense> : <>
        <About />
        <Projects />
        <Writing />
        <GithubActivity />
        <Contact />
        </>}
      </main>
      <footer className="page-shell footer">
        <span>Richard Fan</span>
        <a href="#about">Back to top ↑</a>
      </footer>
    </>
  );
}
