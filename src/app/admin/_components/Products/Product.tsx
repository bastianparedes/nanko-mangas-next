'use client';

import { useState } from 'react';
import Image from 'next/image';
import imageNotFound from '../../../../../resources/images/not-found.webp';

interface Props {
  initialData: {
    name: string;
    priceNormal: number;
    priceOffer: number | null;
    visible: boolean;
    quantity: number;
    idImage: number | null;
    id: number;
  };
  images: {
    id: number;
    descriptiveName: string;
    url: string;
  }[];
}

const Component = ({ initialData, images }: Props) => {
  const [data, setData] = useState(initialData);
  const urlImage =
    data.idImage !== null
      ? images.find((image) => image.id === data.id)?.url ?? null
      : null;

  return (
    <div className="w-auto h-auto flex justify-center">
      <div className="flex justify-start flex-col w-52 md:w-32">
        <div className="flex justify-center items-center aspect-[1/1.61] w-auto overflow-hidden">
          <Image
            alt={data.name}
            className="w-full h-full object-cover"
            loading="lazy"
            src={urlImage ?? imageNotFound}
          />
        </div>
        <select onChange={console.log}>
          <option value={String(null)}>None</option>
          {images.map((image) => (
            <option value={image.url} key={image.id}>
              {image.descriptiveName}
            </option>
          ))}
        </select>
        <input type="text" defaultValue={data.name} placeholder="Name" />
        <input
          type="number"
          defaultValue={data.priceNormal}
          placeholder="Normal price"
        />
        {data.priceOffer !== null && (
          <input
            type="number"
            defaultValue={data.priceOffer}
            placeholder="Offer price"
          />
        )}
      </div>
    </div>
  );
};

export default Component;
