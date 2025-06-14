// components/Layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';
import Head from 'next/head';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Film App</title>
      </Head>
      <header className="top-bar">
        {/* Logo */}
        <Link href="/">
          <img src="/logo.png" alt="film logo" className="app-logo" />
        </Link>
        {/* Navigation hinzufügen */}
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/film">Filmliste</Link>
          <Link href="/new">Neuer Film</Link>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </>
  );
}


