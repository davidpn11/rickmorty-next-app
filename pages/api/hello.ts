import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
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

export async function getCharacters() {
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

export async function getCharactersByPage(page: number) {
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

export async function getAllCharacters(): Promise<Character[]> {
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
    for (let i = 1; i <= nPages; i++) {
      promises = [...promises, getCharactersByPage(i)];
    }
    const res = await Promise.all(promises);
    const allChars = res.reduce((acc, current, index) => {
      return [...acc, ...current.data.characters.results];
    }, []);

    return allChars;
  } catch (error) {
    return [];
  }
}
