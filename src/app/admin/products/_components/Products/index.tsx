'use client';

import { useState } from 'react';
import Product from './Product';
import { trpcClient } from '../../../../../../modules/trpc/client';
import { MdAddToPhotos } from 'react-icons/md';
import Loader from '../../../_components/Loader';

interface Props {
  initialProducts: {
    name: string;
    priceNormal: number;
    priceOffer: number | null;
    visible: boolean;
    idImage: number | null;
    id: number;
  }[];
  images: {
    id: number;
    descriptiveName: string;
    url: string;
  }[];
}

const Component = ({ initialProducts, images }: Props) => {
  const [products, setProducts] = useState(initialProducts);
  const insertProduct = trpcClient.insertProduct.useMutation({
    onSettled(data, error) {
      if (error !== null)
        return window.alert('Hubo un error agregando un producto');
      if (data === undefined)
        return window.alert('Hubo un error agregando un producto');
      const fullData = { ...data, urlImage: null };
      setProducts((previousState) => [fullData, ...previousState]);
    }
  });

  const createProduct = () => {
    insertProduct.mutate({
      name: '',
      priceNormal: 0,
      priceOffer: null,
      visible: false,
      idImage: null
    });
  };

  return (
    <>
      {insertProduct.isLoading && <Loader />}
      <div className="grid gap-12 mt-3 grid-cols-[repeat(auto-fill,_minmax(min(100%,_15rem),_1fr))] lg:gap-5 md:gap-2 md:grid-cols-[repeat(auto-fill,_minmax(min(100%,_7rem),_1fr))]">
        <div className="w-auto h-auto flex justify-center items-start">
          <div className="p-5 border-2 border-gray-800 hover:border-black">
            <button
              onClick={createProduct}
              className="text-9xl text-gray-800 hover:text-black"
            >
              <MdAddToPhotos />
            </button>
          </div>
        </div>
        {products.map((product) => (
          <Product key={product.id} initialData={product} images={images} />
        ))}
      </div>
    </>
  );
};

export default Component;
