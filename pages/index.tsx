import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import Card from "../components/Card";

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

export default function Home() {
  const [characters, setCharacters] = useState([]);

  const populateCharacters = async () => {
    const result = await getCharacters();
    // console.log({ result });
    // console.log();
    setCharacters(result.data.characters.results);
  };

  useEffect(() => {
    populateCharacters();
  }, []);

  console.log(characters);
  return (
    <div>
      <Head>
        <title>Rick & Morty list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {characters.map((c: Character) => (
        <Card key={c.id} character={c} />
      ))}
    </div>
  );
}
