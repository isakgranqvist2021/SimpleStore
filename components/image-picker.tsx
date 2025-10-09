'use client';

import React from 'react';

interface ImagePickerProps {
  images: string[];
}

export function ImagePicker(props: ImagePickerProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div>
      <figure>
        <img
          className="rounded-lg max-h-[600px] object-cover"
          src={props.images[activeIndex]}
          alt="Product image"
        />
      </figure>

      <div className="flex gap-2 mt-2 flex-wrap">
        {props.images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={
              'rounded-lg w-24 h-24 md:w-32 md:h-32 object-cover cursor-pointer ' +
              (index === activeIndex ? 'ring ring-primary' : '')
            }
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
