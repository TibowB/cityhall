import { Region } from "../types/region";

export default function fetchDataFromApi(): Promise<Array<Region>>  {

    const url = 'https://geo.api.gouv.fr/regions';

    return fetch(url).then(response => response.json())
}