import { useState, type MouseEvent } from 'react';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const HANDLE = 'tbhtnybht';
const DOMAIN = 'cebgba.zr';
const rot13 = (value: string) =>
  value.replace(/[a-z]/g, letter => String.fromCharCode(((letter.charCodeAt(0) - 97 + 13) % 26) + 97));
const readAddress = () => `${rot13(HANDLE)}${String.fromCharCode(64)}${rot13(DOMAIN)}`;

export default function Contact() {
  const [address, setAddress] = useState('');
  const arm = () => setAddress(current => current || readAddress());
  const openMail = (event: MouseEvent<HTMLAnchorElement>) => {
    if (address) return;
    event.preventDefault();
    const revealed = readAddress();
    setAddress(revealed);
    window.location.href = `mailto:${revealed}`;
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">Find me elsewhere.</h2>
        <p>More code on GitHub, more about me on LinkedIn, or send me an email.</p>
      </div>
      <div className="contact-links">
        <a className="glass-button" href={address ? `mailto:${address}` : '#contact'} onMouseEnter={arm} onFocus={arm} onClick={openMail}><FiMail /> Email <FiArrowUpRight /></a>
        <a className="glass-button" href="https://github.com/Spitgranger" target="_blank" rel="noopener noreferrer"><FiGithub /> GitHub <FiArrowUpRight /></a>
        <a className="glass-button" href="https://www.linkedin.com/in/fanrichard" target="_blank" rel="noopener noreferrer"><FiLinkedin /> LinkedIn <FiArrowUpRight /></a>
      </div>
    </section>
  );
}
