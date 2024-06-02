import React, { useMemo } from 'react';
import Link from 'next/link';

import Layout from '@/components/layout';
import Table from '@/components/shared/Table';
import { useScreenSizeContext } from '@/providers/screenSizeStore-provider';
import { fetchList } from '@/utils/api-fetch-list';

function Locations({ locations }: { locations: any[] }) {

  const screenSize = useScreenSizeContext((state) => state.screenSize);
  const isMobile = screenSize < 640;
  
  const columns = useMemo(
    () => [
      {
        Header: 'Localización',
        accessor: 'name',
        Cell: ({ row }: any) => (
          <Link href={`/location/${row.original.id}`}>
            <div className="text-blue-500 hover:text-blue-700 cursor-pointer">
              <div className="text-base font-semibold">{row.original.name}</div>
              <div className="text-sm text-gray-500 sm:hidden">
                {row.original.type} - {row.original.dimension}
              </div>
            </div>
          </Link>
        ),
        
      },
      {
        Header: 'Tipo',
        accessor: 'type',
        Cell: ({ value }: any) => <div className="hidden sm:table-cell">{value}</div>,
      },
      {
        Header: 'Dimensión',
        accessor: 'dimension',
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
              <h1 className="text-xl font-semibold">Localizaciones: {locations.length}</h1>
            </div>

            <div >
              <Table columns={filteredColumns} data={locations} />
            </div>
            
          </main>
        </div>
      </Layout>
    </div>
  );
}

export default Locations;

export const getServerSideProps = async () => {
  const locations = await fetchList('location');
  return {
    props: {
      locations,
    },
  };
};