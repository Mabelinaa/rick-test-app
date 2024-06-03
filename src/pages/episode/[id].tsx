import React, { useState } from 'react';
import { GetServerSideProps } from 'next';

import Layout from '@/components/layout';
import Carousel from '@/components/shared/Carousel';
import Breadcrumbs from '@/components/shared/BreadCrumbs';
import EpisodeReviewForm from '@/components/ReviewForm';
import { fetchDetails } from '@/utils/api-fetch-list';

const Episode = ({ episode }: { episode: any }) => {

  const breadCrumbItems = [
    { name: ' ← Volver a Episodios', href: '/'},
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

          <div className='justify-start'>
            <Breadcrumbs items={breadCrumbItems} />
    
            <h1 className="text-2xl font-bold">{episode.name}</h1>
            <p className="text-lg">{episode.episode}</p>
            <p className="text-lg">{episode.air_date}</p>
    
            <h2 className="text-xl font-semibold mt-4">Personajes: {episode.characters.length}</h2>
            <Carousel characters={episode.characters} />
    
            <hr className="my-8" />
    
            <EpisodeReviewForm episodeId={episode.id} />
          </div> 

        </main>
      </div>
    </Layout>
  );
};

export default Episode;

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { id } = context.params!;

  const episode = await fetchDetails('episode', id as string);
  return {
    props: {
      episode,
    },
  };
};