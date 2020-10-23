import { Masonry } from 'masonic';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Filters from '../components/Filter';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { PerfBall } from '../components/PerfBall';
import { useConfig, useFilters } from '../store';
import { chooseSort } from '../utils/helpers';
import { Character, getAllCharacters } from './api';

export default function CharactersList() {
  const { listType } = useConfig();
  const { filter } = useFilters();

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
      <Header />
      <div className="w-full flex flex-col items-center px-6">
        {listType === 'slow_list' ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-center gap-4 my-6 px-4 md:px-6 lg:px-8">
            {sortedList.map((c: Character) => (
              <Card key={c.id} data={c} />
            ))}
          </div>
        ) : (
          <div className="mx-4 w-4/5">
            <Masonry columnCount={3} columnGutter={30} items={sortedList} render={Card} />
          </div>
        )}
        <PerfBall />
      </div>
    </>
  );
}
