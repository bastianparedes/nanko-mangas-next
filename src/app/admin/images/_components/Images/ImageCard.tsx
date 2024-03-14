'use client';

import { useState } from 'react';
import Image from 'next/image';
import { trpcClient } from '../../../../../../modules/trpc/client';

interface Props {
  initialData: {
    id: number;
    descriptiveName: string;
    storedName: string;
    url: string;
  };
}

const Component = ({ initialData }: Props) => {
  const [data, setData] = useState(initialData);
  const [isDeleted, setIsDeleted] = useState(false);
  const updateImage = trpcClient.updateImage.useMutation();
  const deleteImage = trpcClient.deleteImage.useMutation({
    onSettled(dataMutation, error) {
      if (error !== null || dataMutation === undefined)
        return alert(`There was a problem deleting ${data.descriptiveName}`);
      setIsDeleted(true);
    }
  });

  return (
    <div
      className={`w-auto h-auto flex justify-center ${isDeleted ? 'hidden' : ''}`}
    >
      <div className="flex justify-start flex-col w-52 gap-3 md:w-32">
        <div className="flex justify-center items-center aspect-[1/1.61] w-auto overflow-hidden relative">
          <Image
            alt={data.descriptiveName}
            className="w-full h-full object-cover"
            loading="lazy"
            src={data.url}
            width={208}
            height={334}
          />
        </div>
        <input
          type="text"
          className="border-black border-2 p-1"
          value={data.descriptiveName}
          placeholder="Name"
          onChange={(event) =>
            setData({ ...data, descriptiveName: event.target.value })
          }
        />
        <div className="flex place-content-around">
          <button
            className="border-2 border-black p-2 bg-slate-400 rounded-lg"
            onClick={() =>
              updateImage.mutate({
                values: { descriptiveName: data.descriptiveName },
                id: data.id
              })
            }
          >
            Save
          </button>
          <button
            className="p-2 bg-red-400 rounded-lg"
            onClick={async () => {
              const confirm = window.confirm(
                `Are you shure you want to delete ${data.descriptiveName}?`
              );
              if (!confirm) return;
              deleteImage.mutate({ id: data.id });
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
