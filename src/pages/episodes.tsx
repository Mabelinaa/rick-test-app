import React, { useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import Table from '@/components/shared/Table';
import { useScreenSizeContext } from '@/providers/screenSizeStore-provider';

const fetchEpisodes = async () => {
  let allEpisodes  = [] as any[];
  let nextPage = 'https://rickandmortyapi.com/api/episode';

  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();
    allEpisodes = allEpisodes.concat(data.results);
    nextPage = data.info.next;
  }

  return allEpisodes.map((episode: any) => ({
    id: episode.id,
    name: episode.name,
    air_date: episode.air_date,
    episode: episode.episode,
  }));
};

function Episodes({ episodes }: { episodes: any[] }) {

  const sizeScreen = useScreenSizeContext((state) => state.screenSize);
  console.log(sizeScreen);
  
  const columns = useMemo(
    () => [
      {
        Header: 'Episodio',
        accessor: 'name',
        Cell: ({ row }: any) => (
          <Link href={`/episode/${row.original.id}`}>
            <div className="text-blue-500 hover:text-blue-700 cursor-pointer">
              <div className="text-base font-semibold">{row.original.name}</div>
              <div className="text-sm text-gray-500 sm:hidden">
                {row.original.air_date} - {row.original.episode}
              </div>
            </div>
          </Link>
        ),
        
      },
      {
        Header: 'Fecha Emisión',
        accessor: 'air_date',
        Cell: ({ value }: any) => <div className="hidden sm:table-cell">{value}</div>,
      },
      {
        Header: 'Temporada',
        accessor: 'episode',
        Cell: ({ value }: any) => <div className="hidden sm:table-cell">{value}</div>,
      },
    ],
    []
  );

  const filteredColumns = useMemo(() => {
    if (sizeScreen < 640) {
      return columns.slice(0, 1);
    }
    return columns;
  }, [columns, sizeScreen]);


  return (
    <div>
      <Layout>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
              <h1 className="text-xl font-semibold">Episodios: {episodes.length}</h1>
            </div>
            <div className="table-container">
              <Table columns={filteredColumns} data={episodes} />
            </div>
            
          </main>
        </div>
      </Layout>
    </div>
  );
}

export default Episodes;

export const getServerSideProps = async () => {
  const episodes = await fetchEpisodes();
  return {
    props: {
      episodes,
    },
  };
};