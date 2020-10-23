import Head from 'next/head';
import Nav from '../components/Nav';
import '../styles/globals.css';

function MyApp({ Component }) {
  return (
    <div>
      <Head>
        <title>Rick & Morty list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Component />
    </div>
  );
}

export default MyApp;
