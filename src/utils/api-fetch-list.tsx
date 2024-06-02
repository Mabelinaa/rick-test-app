import { Episode } from "@/types";
import { Location } from "@/types";

export const fetchList = async (endpoint: string) => {

  const API_URL = process.env.API_URL;
  let nextPage = `${API_URL}${endpoint}`
  let allItems = [] as any[];
  if (endpoint === "episode") {
  allItems  = [] as Episode[]
  } else { 
  allItems  = [] as Location[]
  }
  
  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();
    allItems = allItems.concat(data.results);
    nextPage = data.info.next;
  }

  return allItems;
};

export const fetchDetails = async (endpoint: string, id: string) => {

  const API_URL = process.env.API_URL;
  const response = await fetch(`${API_URL}${endpoint}/${id}`);
  const data = await response.json();
  
  const items = await Promise.all(
    data.characters ? data.characters.map(async (url: string) => {
      const res = await fetch(url);
      return await res.json();
    }) : data.residents.map(async (url: string) => {
      const res = await fetch(url);
      return await res.json();
    })
  );

  if (endpoint === "episode") {
    return {
      id: data.id,
      name: data.name,
      air_date: data.air_date,
      episode: data.episode,
      characters: data.characters ? items.map((item: any) => ({
        name: item.name,
        image: item.image,
      })) : [],
    };
  } else {
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      dimension: data.dimension,
      residents: data.residents ? items.map((item: any) => ({
        name: item.name,
        image: item.image,
      })) : [],
    };
  }
}