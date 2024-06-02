import React, { useMemo } from 'react';
import Link from 'next/link';

import Layout from '@/components/layout';
import Table from '@/components/shared/Table';
import { useScreenSizeContext } from '@/providers/screenSizeStore-provider';
import { fetchList } from '@/utils/api-fetch-list';

function Episodes({ episodes }: { episodes: any[] }) {

  const screenSize = useScreenSizeContext((state) => state.screenSize);
  const isMobile = screenSize < 640;
  
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
    if (isMobile) {
      return columns.slice(0, 1);
    }
    return columns;
  }, [columns, isMobile]);


  return (
    <div>
      <Layout>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
              <h1 className="text-xl font-semibold">Episodios: {episodes.length}</h1>
            </div>

            <div >
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
  const episodes = await fetchList('episode');
  return {
    props: {
      episodes,
    },
  };
};