'use client';

import React, { useState } from 'react';
import ImageCard from './ImageCard';
import path from 'path';
import nextConfig from '../../../../../../next.config.mjs';
import Loader from '../../../_components/Loader';

interface Props {
  initialImages: {
    id: number;
    descriptiveName: string;
    storedName: string;
    url: string;
  }[];
}

const Component = ({ initialImages }: Props) => {
  const [images, setImages] = useState(initialImages);
  const [newImage, setNewImage] = useState<{
    file: File | null;
    descriptiveName: string;
  }>({ file: null, descriptiveName: '' });
  const [isLoading, setIsLoading] = useState(false);

  const insertImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimedDescriptiveName = newImage.descriptiveName.trim();

    if (trimedDescriptiveName === '' || newImage.file === null) {
      alert('Debes poner un nombre y una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('descriptiveName', trimedDescriptiveName);
    formData.append('image', newImage.file);

    setIsLoading(true);
    fetch(path.join(nextConfig.basePath, '/api/admin/uploadImage'), {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((json) => {
        setNewImage({ file: null, descriptiveName: '' });
        setImages((previousState) => [
          {
            descriptiveName: json.descriptiveName,
            url: json.url,
            id: json.id,
            storedName: json.storedName
          },
          ...previousState
        ]);
        location.reload();
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="grid gap-12 mt-3 grid-cols-[repeat(auto-fill,_minmax(min(100%,_15rem),_1fr))] lg:gap-5 md:gap-2 md:grid-cols-[repeat(auto-fill,_minmax(min(100%,_7rem),_1fr))]">
        <div className="w-auto h-auto flex justify-center items-start p-5">
          <form className="max-w-md mx-auto mt-8" onSubmit={insertImage}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newImage.descriptiveName}
                onChange={(event) =>
                  setNewImage((previousState) => ({
                    ...previousState,
                    descriptiveName: event.target.value
                  }))
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Imagen:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept=".jpg, .jpeg, .png, .webp, .gif, .avif, .tiff, .svg"
                onChange={(event) => {
                  if (
                    event.target.files !== null &&
                    event.target.files.length > 0
                  ) {
                    const file = event.target.files[0];
                    setNewImage((previousState) => ({
                      ...previousState,
                      file
                    }));
                  }
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {newImage.descriptiveName.trim() !== '' &&
              newImage.file !== null && (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Guardar imagen
                </button>
              )}
          </form>
        </div>
        {images.map((image) => (
          <ImageCard key={image.id} initialData={image} />
        ))}
      </div>
    </>
  );
};

export default Component;
