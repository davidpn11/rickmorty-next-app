import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Filters from "../components/Filter";
import { chooseSort } from "../utils/helpers";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
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

export type FilterValue = "SPECIES" | "NAME" | "LOCATION";
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

async function getAllCharacters(): Promise<Character[]> {
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
    const nPages = meta.data.characters.info.pages;
    for (let i = 0; i < nPages; i++) {
      promises = [...promises, getCharactersByPage(i)];
    }
    const res = await Promise.all(promises);
    const allChars = res.reduce((acc, current) => {
      return [...acc, ...current.data.characters.results];
    }, []);

    return allChars;
  } catch (error) {
    return [];
  }
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState<FilterValue>("NAME");

  const populateCharacters = async () => {
    const result = await getCharacters();
    // const allChars = await getAllCharacters();
    // console.log({ result });
    // console.log();
    // setCharacters(allChars);
    setCharacters(result.data.characters.results);
  };

  useEffect(() => {
    populateCharacters();
  }, []);

  const sortedList = () => {
    return [...characters].sort(chooseSort(filter));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Filters filterValue={filter} onChange={(f) => setFilter(f)} />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-center gap-4 my-6 px-4 md:px-6 lg:px-8">
        <Head>
          <title>Rick & Morty list</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {sortedList().map((c: Character) => (
          <Card key={c.id} character={c} />
        ))}
      </div>
    </div>
  );
}
