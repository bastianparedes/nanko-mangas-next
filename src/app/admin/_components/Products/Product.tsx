'use client';

import { useState } from 'react';
import Image from 'next/image';
import imageNotFound from '../../../../../resources/images/not-found.webp';
import Select from 'react-select';
import { trpcClient } from '../../../../../modules/trpc/client';

interface Props {
  initialData: {
    name: string;
    priceNormal: number;
    priceOffer: number | null;
    visible: boolean;
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
  const [isDeleted, setIsDeleted] = useState(false);
  const urlImage =
    data.idImage !== null
      ? images.find((image) => image.id === data.idImage)?.url ?? null
      : null;
  const updateProduct = trpcClient.updateProduct.useMutation();
  const deleteProduct = trpcClient.deleteProduct.useMutation();

  return (
    <div
      className={`w-auto h-auto flex justify-center ${isDeleted ? 'hidden' : ''}`}
    >
      <div className="flex justify-start flex-col w-52 gap-3 md:w-32">
        <div
          className={`flex justify-center items-center aspect-[1/1.61] w-auto overflow-hidden relative  ${!data.visible ? 'opacity-20' : ''}`}
        >
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
          options={[
            {
              value: null,
              label: 'None'
            },
            ...images.map((image) => ({
              value: image.id,
              label: image.descriptiveName
            }))
          ]}
          onChange={(event) =>
            setData({ ...data, idImage: event?.value ?? null })
          }
        />
        <div className="flex gap-5">
          <input
            type="checkbox"
            checked={data.visible}
            onChange={() => setData({ ...data, visible: !data.visible })}
          />
          <span>{data.visible ? 'Visible' : 'No visible'}</span>
        </div>
        <input
          type="text"
          className="border-black border-2 p-1"
          value={data.name}
          placeholder="Name"
          onChange={(event) => setData({ ...data, name: event.target.value })}
        />
        <div className="flex flex-col">
          <div>
            <input
              type="checkbox"
              checked={data.priceOffer !== null}
              onChange={() => setData({ ...data, visible: !data.visible })}
            />
            <span>Show offer price</span>
          </div>
          {data.priceOffer !== null && (
            <input
              type="number"
              className="border-black border-2 p-1"
              defaultValue={data.priceOffer}
              placeholder="Offer price"
              onChange={(event) =>
                setData({
                  ...data,
                  priceOffer: Math.max(0, Number(event.target.value))
                })
              }
            />
          )}
        </div>
        <input
          type="number"
          className="border-black border-2 p-1"
          value={data.priceNormal}
          placeholder="Normal price"
          onChange={(event) =>
            setData({
              ...data,
              priceOffer: Math.max(0, Number(event.target.value))
            })
          }
        />
        <div className="flex place-content-around">
          <button
            className="border-2 border-black p-2 bg-slate-400 rounded-lg"
            onClick={() =>
              updateProduct.mutate({
                values: {
                  name: data.name,
                  priceNormal: data.priceNormal,
                  priceOffer: data.priceOffer,
                  visible: data.visible,
                  idImage: data.idImage
                },
                id: data.id
              })
            }
          >
            Save
          </button>
          <button
            className="p-2 bg-red-400 rounded-lg"
            onClick={() => {
              const confirm = window.confirm(
                `Are you shure you want to delete ${data.name}?`
              );
              if (!confirm) return;
              deleteProduct.mutate({ id: data.id });
              setIsDeleted(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Component;
