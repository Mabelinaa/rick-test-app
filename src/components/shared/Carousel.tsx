import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Carousel = ({ characters }: { characters: any[] }) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={4} className="mt-4">
      {characters.map((character, index) => (
        <SwiperSlide key={index}>
          <div className="text-center">
            <img
              src={character.image}
              alt={character.name}
              className="rounded-full w-24 h-24 mx-auto"
            />
            <p>{character.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
