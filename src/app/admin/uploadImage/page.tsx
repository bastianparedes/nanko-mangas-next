'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import path from 'path';
import nextConfig from '../../../../next.config.mjs';

const Formulario: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleFotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      window.alert('Por favor, completa todos los campos.');
      return;
    }

    // Crear un objeto FormData para enviar al servidor
    const formData = new FormData();
    formData.append('image', image);

    // Enviar el formData a tu endpoint
    fetch(path.join(nextConfig.basePath, '/api/admin/uploadImage'), {
      method: 'POST',
      body: formData
    })
      .then(() => {
        window.alert('Archivo subido correctamente');
      })
      .catch(() => {
        window.alert('Error al subir el archivo');
      });
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          Foto (PNG o JPG):
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept=".png, .jpg, .jpeg"
          onChange={handleFotoChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </form>
  );
};

export default Formulario;
