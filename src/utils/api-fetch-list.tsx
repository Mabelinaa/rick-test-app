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