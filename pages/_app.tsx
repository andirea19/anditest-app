import '@/css/style.css';    // dein globales CSS
import '@/css/form.css';     // fallbacks für Formulare
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
// This is the main entry point for your Next.js application.
// It imports global styles and wraps each page with a Layout component.
// The Layout component typically includes common elements like headers and footers.
// The `AppProps` type is used to type the props passed to the App component.