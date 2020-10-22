import Head from 'next/head';
import {
  ApolloClient,
  InMemoryCache,
  gql,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Filters from '../components/Filter';
import { chooseSort } from '../utils/helpers';
import {
  Masonry,
  useMasonry,
  usePositioner,
  useResizeObserver,
} from 'masonic';
import { Loader } from '../components/Loader';
import { LabButton } from '../components/LabButton';
import {
  FilterValue,
  useFilters,
} from '../store';
import { Header } from '../components/Header';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
  cache: new InMemoryCache(),
});

export type Character = {
  name: string;
  id: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
};

async function getCharacters() {
  const result = await client.query({
    query: gql`
      query {
        characters {
          info {
            count
          }
          results {
            name
            id
            species
            image
            location {
              name
            }
          }
        }
      }
    `,
  });
  return result;
}

async function getCharactersByPage(page: number) {
  return client.query({
    query: gql`
      query {
        characters(page: ${page}) {
          results {
            name
            id
            species
            image
            location {
              name
            }
          }
        }
      }
    `,
  });
}

async function getAllCharacters(): Promise<
  Character[]
> {
  try {
    const meta = await client.query({
      query: gql`
        query {
          characters {
            info {
              count
              pages
            }
          }
        }
      `,
    });
    let promises = [];
    const nPages =
      meta.data.characters.info.pages;
    for (let i = 1; i <= nPages; i++) {
      promises = [
        ...promises,
        getCharactersByPage(i),
      ];
    }
    const res = await Promise.all(promises);
    const allChars = res.reduce(
      (acc, current, index) => {
        console.log(index, current);
        return [
          ...acc,
          ...current.data.characters.results,
        ];
      },
      [],
    );

    return allChars;
  } catch (error) {
    return [];
  }
}

export default function Home() {
  const { filter } = useFilters();
  const [characters, setCharacters] = useState<
    Character[]
  >([]);

  const populateCharacters = async () => {
    // const result = await getCharacters();
    // setCharacters(result.data.characters.results);
    const allChars = await getAllCharacters();
    setCharacters(allChars);
  };

  useEffect(() => {
    populateCharacters();
  }, []);

  const sortedList = [...characters].sort(
    chooseSort(filter),
  );
  console.log(sortedList);

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
        {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-center gap-4 my-6 px-4 md:px-6 lg:px-8">
        {sortedList.map((c: Character) => (
          <Card key={c.id} data={c} />
        ))}
      </div> */}
        <div
          className="mx-4"
          style={{ width: '80%' }}>
          <Masonry
            columnCount={3}
            columnGutter={30}
            items={sortedList}
            render={Card}
          />
        </div>
      </div>
    </>
  );
}
