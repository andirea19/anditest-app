// components/Layout.tsx
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  // State für Dark Mode
  const [isDark, setIsDark] = useState(false);

  // Beim ersten Laden: aus localStorage oder System-Voreinstellung lesen
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
    } else if (stored === 'light') {
      setIsDark(false);
    } else {
      // Fallback auf System
      setIsDark(
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
  }, []);

  // Dark-Klasse updaten und in localStorage speichern
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <>
      <Head>
        <title>Film App</title>
      </Head>
      <header className="top-bar flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/">
          <img src="/logo.png" alt="Film Logo" className="app-logo h-6 w-auto" />
        </Link>
        {/* Navigation und Dark-Mode Toggle */}
        <nav className="flex items-center space-x-8">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/film" className="hover:underline">
          Filmliste
        </Link>
        <Link href="/new" className="hover:underline">
          Neuer Film
        </Link>
        <Link href="" className="pointer-events-none select-none">&nbsp;</Link>
        <Link href="" className="pointer-events-none select-none">&nbsp;</Link>
        <button
          aria-label="Toggle Dark Mode"
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-xl"
        >
            {isDark ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>
      <main className="app-main mt-16 p-4">{children}</main>
    </>
  );
}
// This Layout component provides a consistent header with navigation links and a dark mode toggle.
// It uses localStorage to remember the user's theme preference and applies the appropriate classes to the <document className="">  haha</document>