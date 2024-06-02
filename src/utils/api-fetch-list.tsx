import { Episode } from "@/types";
import { Location } from "@/types";

export const fetchList = async <T>(endpoint: string): Promise<T[]> => {

  const API_URL = process.env.API_URL;
  let allItems = [] as T[];
  let nextPage = `${API_URL}${endpoint}`;

  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();
    allItems = allItems.concat(data.results);
    nextPage = data.info.next;
  }

  return allItems;
};