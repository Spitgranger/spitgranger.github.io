import { useState } from 'react';
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import useThemeSwitcher from '../hooks/useDarkMode';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useThemeSwitcher();
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a href="#about" className="wordmark" onClick={() => setOpen(false)}>Richard Fan</a>
        <nav id="primary-navigation" aria-label="Main navigation" className={open ? 'navigation is-open' : 'navigation'} onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>
          <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="#writing" onClick={() => setOpen(false)}>Writing</a>
          <a href="#activity" onClick={() => setOpen(false)}>Activity</a>
          <a href="#contact" onClick={() => setOpen(false)}>Elsewhere</a>
        </nav>
        <div className="header-actions">
          <a className="header-github" href="https://github.com/Spitgranger" target="_blank" rel="noopener noreferrer">GitHub <FiArrowUpRight /></a>
          <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <FiSun /> : <FiMoon />}</button>
          <button className="icon-button menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
        </div>
      </div>
    </header>
  );
}
