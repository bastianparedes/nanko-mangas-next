'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import path from 'path';
import nextConfig from '../../../../next.config.mjs';
import { trpc } from '../../_trpc/client';

const Component: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const getTodos = trpc.getTodos.useQuery();
  /* const getHola = trpc.getHola.useMutation({
    onSettled: () => getTodos.refetch()
  }); */
  /* getHola.mutate('string obligatorio'); */

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !image) {
      console.error('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('descriptiveName', name);
    formData.append('image', image);

    fetch(path.join(nextConfig.basePath, '/api/admin/uploadImage'), {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Server response:' + data);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name: {getTodos.data}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept=".jpg, .jpeg, .png, .webp, .gif, .avif, .tiff, .svg"
          onChange={handlePhotoChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default Component;
