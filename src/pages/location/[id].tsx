import React from 'react';
import { GetServerSideProps } from 'next';

import Layout from '@/components/layout';
import Carousel from '@/components/shared/Carousel';
import Breadcrumbs from '@/components/shared/BreadCrumbs';
import { fetchDetails } from '@/utils/api-fetch-list';
import { Spinner } from '@/components/ui/spinner';

const Location = ({ location }: { location: any }) => {

    const breadCrumbItems = [
    { name: ' ← Volver a Localizaciones', href: '/locations' },
    ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

          {location? (
            <div>
              <Breadcrumbs items={breadCrumbItems} />

              <h1 className="text-2xl font-bold">{location.name}</h1>
              <p className="text-lg">{location.type}</p>
              <p className="text-lg">{location.dimension}</p>

              <h2 className="text-xl font-semibold mt-4">Residentes: {location.residents.length}</h2>
              <Carousel characters={location.residents} />
            </div>
          ) : (
            <div className="text-center">
              <Spinner />
            </div>
          )}
          
        </main>
      </div>
    </Layout>
  );
};

export default Location;

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { id } = context.params!;
  
  const location = await fetchDetails('location', id as string);
  return {
    props: {
      location,
    },
  };
};