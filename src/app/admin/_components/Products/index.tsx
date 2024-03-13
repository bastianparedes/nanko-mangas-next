'use client';

import { useState } from 'react';
import Product from './Product';
import { trpcClient } from '../../../../../modules/trpc/client';

interface Props {
  initialProducts: {
    name: string;
    priceNormal: number;
    priceOffer: number | null;
    visible: boolean;
    quantity: number;
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
      name: 'New manga',
      priceNormal: 0,
      priceOffer: null,
      visible: false,
      quantity: 0,
      idImage: null
    });
  };

  return (
    <div className="grid gap-12 mt-3 grid-cols-[repeat(auto-fill,_minmax(min(100%,_15rem),_1fr))] lg:gap-5 md:gap-2 md:grid-cols-[repeat(auto-fill,_minmax(min(100%,_7rem),_1fr))]">
      <button onClick={createProduct}>
        <div className="w-52 h-52 bg-red-500"></div>
      </button>
      {products.map((product) => (
        <Product key={product.id} initialData={product} images={images} />
      ))}
    </div>
  );
};

export default Component;
