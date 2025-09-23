'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface ImageSwiperProps {
  images: string[];
}

export function ImageSwiper(props: ImageSwiperProps) {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        768: { slidesPerView: 1.2 },
        1024: { slidesPerView: 2.1 },
        1280: { slidesPerView: 3.2 },
      }}
    >
      {props.images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            className="w-full object-cover h-96 md:h-128"
            src={image}
            alt={`Product image ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
