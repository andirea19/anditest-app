// pages/index.tsx
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: '/film', permanent: false },
});

export default function Home() {
  return null; // wird nie gerendert, da redirect
}
