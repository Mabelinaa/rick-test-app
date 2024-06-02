import React from 'react';
import { GetServerSideProps } from 'next';

import Layout from '@/components/layout';
import Carousel from '@/components/shared/Carousel';
import Breadcrumbs from '@/components/shared/BreadCrumbs';
import EpisodeReviewForm from '@/components/ReviewForm';

const fetchEpisodeDetails = async (id: string) => {
  const API_URL = process.env.API_URL;
  const response = await fetch(`${API_URL}/episode/${id}`);
  const data = await response.json();

  const characters = await Promise.all(
    data.characters.map(async (url: string) => {
      const res = await fetch(url);
      return await res.json();
    })
  );

  return {
    id: data.id,
    name: data.name,
    air_date: data.air_date,
    episode: data.episode,
    characters: characters.map((character: any) => ({
      name: character.name,
      image: character.image,
    })),
  };
};

const Episode = ({ episode }: { episode: any }) => {

  const breadCrumbItems = [
    { name: ' ← Volver a Episodios', href: '/'},
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

          <Breadcrumbs items={breadCrumbItems} />

          <h1 className="text-2xl font-bold">{episode.name}</h1>
          <p className="text-lg">{episode.episode}</p>
          <p className="text-lg">{episode.air_date}</p>

          <h2 className="text-xl font-semibold mt-4">Personajes: {episode.characters.length}</h2>
          <Carousel characters={episode.characters} />

          <hr className="my-8" />

          <EpisodeReviewForm episodeId={episode.id} />
          
        </main>
      </div>
    </Layout>
  );
};

export default Episode;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const episode = await fetchEpisodeDetails(id as string);
  return {
    props: {
      episode,
    },
  };
};