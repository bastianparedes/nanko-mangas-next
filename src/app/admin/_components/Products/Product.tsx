'use client';

import { useState } from 'react';
import Image from 'next/image';
import imageNotFound from '../../../../../resources/images/not-found.webp';
import Select from 'react-select';

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
      <div className="flex justify-start flex-col w-52 gap-5 md:w-32">
        <div className="flex justify-center items-center aspect-[1/1.61] w-auto overflow-hidden">
          <Image
            alt={data.name}
            className="w-full h-full object-cover"
            loading="lazy"
            src={urlImage ?? imageNotFound}
            width={208}
            height={334}
          />
        </div>
        <Select
          instanceId="Select"
          options={images.map((image) => ({
            value: image.id,
            label: image.descriptiveName
          }))}
          onChange={(event) =>
            setData({ ...data, idImage: event?.value ?? null })
          }
        />
        <input
          type="text"
          value={data.name}
          placeholder="Name"
          onChange={(event) => setData({ ...data, name: event.target.value })}
        />
        <input
          type="number"
          value={data.priceNormal}
          placeholder="Normal price"
          onChange={(event) =>
            setData({ ...data, priceNormal: Number(event.target.value) })
          }
        />
        {data.priceOffer !== null && (
          <input
            type="number"
            defaultValue={data.priceOffer}
            placeholder="Offer price"
            onChange={(event) =>
              setData({ ...data, priceOffer: Number(event.target.value) })
            }
          />
        )}
      </div>
    </div>
  );
};

export default Component;
