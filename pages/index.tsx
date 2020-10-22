import Head from 'next/head';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { chooseSort } from '../utils/helpers';
import { Masonry } from 'masonic';
import { Loader } from '../components/Loader';
import { useConfig, useFilters } from '../store';
import { Header } from '../components/Header';
import { Character, getAllCharacters } from './api/hello';
import { PerfBall } from '../components/PerfBall';
// import '../styles/perfBall.css';

export default function Home() {
  const { filter } = useFilters();
  const { listType } = useConfig();
  const [characters, setCharacters] = useState<Character[]>([]);

  const populateCharacters = async () => {
    // const result = await getCharacters();
    // setCharacters(result.data.characters.results);
    const allChars = await getAllCharacters();
    setCharacters(allChars);
  };

  useEffect(() => {
    populateCharacters();
  }, []);

  const sortedList = [...characters].sort(chooseSort(filter));

  if (characters.length === 0) {
    return <Loader mode="FULL_SCREEN" />;
  }

  return (
    <>
      <Head>
        <title>Rick & Morty list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="w-full flex flex-col items-center px-6">
        {listType === 'slow_list' ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-center gap-4 my-6 px-4 md:px-6 lg:px-8">
            {sortedList.map((c: Character) => (
              <Card key={c.id} data={c} />
            ))}
          </div>
        ) : (
          <div className="mx-4" style={{ width: '80%' }}>
            <Masonry columnCount={3} columnGutter={30} items={sortedList} render={Card} />
          </div>
        )}

        <PerfBall />
      </div>
    </>
  );
}
