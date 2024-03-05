/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import path from 'path';
import nextConfig from '../../../../../next.config.mjs';
import type { Product } from '../../../../../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const formatPrice = (number: number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const Price = ({
  price,
  priceSale
}: {
  price: Product['price'];
  priceSale: Product['priceSale'];
}) => {
  if (priceSale === null) {
    return <span className="font-bold text-base">$ {formatPrice(price)}</span>;
  }

  const discount = 100 - Math.round((100 * priceSale) / price);
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="font-bold text-base">$ {formatPrice(priceSale)}</span>
        <span className="text-white py-0.5 px-1 bg-red-400 rounded text-xs">
          -{discount}%
        </span>
      </div>
      <span className="line-through text-gray-400 text-sm">
        $ {formatPrice(price)}
      </span>
    </>
  );
};

interface Props {
  data: Product;
}

const Component = ({ data }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  return (
    <div
      className="w-auto h-auto flex justify-center"
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-start flex-col w-52 md:w-32">
        <div className="flex justify-center items-center aspect-[1/1.61] w-auto overflow-hidden">
          <img
            alt={data.id}
            className="w-full h-full object-cover"
            loading="lazy"
            src={
              path.join(nextConfig.basePath, '/api/image') +
              '?fileName=' +
              data.image
            }
          />
        </div>
        <span className="my-1 md:text-base/4">{data.id}</span>
        <Price price={data.price} priceSale={data.priceSale} />
      </div>
    </div>
  );
};

export default Component;
