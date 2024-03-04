'use client';

/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import path from 'path';
import nextConfig from '../../../../next.config.mjs';
import { ReactSortable } from 'react-sortablejs';
import { useState } from 'react';
import Product from './Product';

interface Props {
  initialProducts: {
    name: string;
    picture: string;
    price: number;
    priceSale: number | undefined;
  }[];
}

const Component = ({ initialProducts }: Props) => {
  const [products, setProducts] = useState(initialProducts);
  const productsWithId = products.map((product) => ({
    ...product,
    id: product.name
  }));
  console.log(products);
  return (
    <ReactSortable
      animation={300}
      className="grid gap-12 mt-3 grid-cols-[repeat(auto-fill,_minmax(min(100%,_15rem),_1fr))] lg:gap-5 md:gap-2 md:grid-cols-[repeat(auto-fill,_minmax(min(100%,_7rem),_1fr))]"
      ghostClass="opacity-0"
      list={productsWithId}
      setList={setProducts}
    >
      {products.map((product: any) => (
        <Product
          key={product.name}
          name={product.name}
          picture={product.picture}
          price={product.price}
          priceSale={product.priceSale}
        />
      ))}
      <div className="w-52 h-52 bg-red-500" draggable={false}></div>
    </ReactSortable>
  );
};

export default Component;
