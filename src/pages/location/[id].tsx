import React from 'react';
import { GetServerSideProps } from 'next';

import Layout from '@/components/layout';
import Carousel from '@/components/shared/Carousel';
import Breadcrumbs from '@/components/shared/BreadCrumbs';

const fetchLocationDetails = async (id: string) => {
  const API_URL = process.env.API_URL;
  const response = await fetch(`${API_URL}/location/${id}`);
  const data = await response.json();

  const residents = await Promise.all(
    data.residents.map(async (url: string) => {
      const res = await fetch(url);
      return await res.json();
    })
  );

  return {
    name: data.name,
    type: data.type,
    dimension: data.dimension,
    residents: residents.map((resident: any) => ({
      name: resident.name,
      image: resident.image,
    })),
  };
};

const Location = ({ location }: { location: any }) => {

    const breadCrumbItems = [
    { name: ' ← Volver a Localizaciones', href: '/locations' },
    ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

          <Breadcrumbs items={breadCrumbItems} />

          <h1 className="text-2xl font-bold">{location.name}</h1>
          <p className="text-lg">{location.type}</p>
          <p className="text-lg">{location.dimension}</p>

          <h2 className="text-xl font-semibold mt-4">Residentes: {location.residents.length}</h2>
          <Carousel characters={location.residents} />

          
        </main>
      </div>
    </Layout>
  );
};

export default Location;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const location = await fetchLocationDetails(id as string);
  return {
    props: {
      location,
    },
  };
};