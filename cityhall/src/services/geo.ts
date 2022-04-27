import { Departement } from '../types/departement';
import { Region } from '../types/region';
import { Commune } from '../types/commune';

const BASE_URL = 'https://geo.api.gouv.fr/';

export function getRegions(): Promise<Array<Region>> {
  return fetch(BASE_URL + 'regions').then((response) => response.json());
}

export function getDepartementsFromRegion(
  codeRegion: string
): Promise<Array<Departement>> {
  return fetch(BASE_URL + `regions/${codeRegion}/departements`).then(
    (response) => response.json()
  );
}

export function getCommunesFromDepartement(
  codeDepartement: string
): Promise<Array<Commune>> {
  return fetch(
    BASE_URL + `departements/${codeDepartement}/communes?fields=nom,code`
  ).then((response) => response.json());
}
