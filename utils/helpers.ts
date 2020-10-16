import { Character, FilterValue } from "../pages";

export function sortByName(a: Character, b: Character) {
  console.log(a, b);
  if (!a.name || !b.name) return 0;
  const nameA = a.name.toLocaleLowerCase();
  const nameB = b.name.toLocaleLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

export function sortBySpecies(a: Character, b: Character) {
  if (!a.species || !b.species) return 0;
  const speciesA = a.species.toLocaleLowerCase();
  const speciesB = b.species.toLocaleLowerCase();

  if (speciesA < speciesB) {
    return -1;
  }
  if (speciesA > speciesB) {
    return 1;
  }
  return 0;
}

export function sortByLocation(a: Character, b: Character) {
  if (!a.location.name || !b.location.name) return 0;

  const locationA = a.location.name.toLocaleLowerCase();
  const locationB = b.location.name.toLocaleLowerCase();

  if (locationA < locationB) {
    return -1;
  }
  if (locationA > locationB) {
    return 1;
  }
  return 0;
}

export function chooseSort(filterValue: FilterValue) {
  switch (filterValue) {
    case "SPECIES":
      return sortBySpecies;
    case "LOCATION":
      return sortByLocation;
    case "NAME":
    default:
      return sortByName;
  }
}
