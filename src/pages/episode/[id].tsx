import React from 'react';
import Layout from '@/components/layout';
import { GetServerSideProps } from 'next';
import Carousel from '@/components/shared/Carousel';

const fetchEpisodeDetails = async (id: string) => {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  const data = await response.json();

  const characters = await Promise.all(
    data.characters.map(async (url: string) => {
      const res = await fetch(url);
      return await res.json();
    })
  );

  return {
    name: data.name,
    air_date: data.air_date,
    episode: data.episode,
    characters: characters.map((character: any) => ({
      name: character.name,
      image: character.image,
    })),
  };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const episode = await fetchEpisodeDetails(id as string);
  return {
    props: {
      episode,
    },
  };
};

const Episode = ({ episode }: { episode: any }) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <h1 className="text-2xl font-bold">{episode.name}</h1>
          <p className="text-lg">{episode.episode}</p>
          <p className="text-lg">{episode.air_date}</p>

          <h2 className="text-xl font-semibold mt-4">Personajes: {episode.characters.length}</h2>
          <Carousel characters={episode.characters} />

          {/* Form */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Comentarios</h2>
            <form className="mt-2">
              <input
                type="text"
                placeholder="Tu nombre"
                className="block w-full p-2 border border-gray-300 rounded mt-2"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="block w-full p-2 border border-gray-300 rounded mt-2"
              />
              <textarea
                placeholder="Comentario (máx. 500 caracteres)"
                className="block w-full p-2 border border-gray-300 rounded mt-2"
                maxLength={500}
              />
              <button
                type="submit"
                className="mt-2 p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                ENVIAR
              </button>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Episode;
