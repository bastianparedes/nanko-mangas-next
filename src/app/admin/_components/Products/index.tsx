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
    urlImage: string | null;
  }[];
}

const Component = ({ initialProducts }: Props) => {
  const [products, setProducts] = useState(initialProducts);
  const insertProduct = trpcClient.insertProduct.useMutation({
    onSettled(data, error, variables, context) {
      console.log({ data, error, variables, context });
    }
  });

  insertProduct.isLoading;

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
        <div className="w-52 h-52 bg-red-500" draggable={false}></div>
      </button>
      {products.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </div>
  );
};

export default Component;
