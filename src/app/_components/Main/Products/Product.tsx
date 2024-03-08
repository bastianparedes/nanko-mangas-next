/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import path from 'path';
import nextConfig from '../../../../../next.config.mjs';
import type { Product } from '../../../../../types';

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
  const PHONE_NUMBER = process.env.PHONE_NUMBER ?? '';
  return (
    <div className="w-auto h-auto flex justify-center">
      <div className="flex justify-start flex-col w-52 md:w-32">
        <div className="flex justify-center items-center aspect-[1/1.61] w-auto overflow-hidden">
          <a
            className="w-full h-full"
            href={`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=Hola Nanko Mangas!, quiero comprar "${data.id}"`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={data.id}
              className="w-full h-full object-cover duration-[400ms] ease-in-out hover:scale-[1.2] md:hover:scale-[initial]"
              loading="lazy"
              src={path.join(nextConfig.basePath, '/api/image', data.image)}
            />
          </a>
        </div>
        <span className="my-1 md:text-base/4">{data.id}</span>
        <Price price={data.price} priceSale={data.priceSale} />
      </div>
    </div>
  );
};

export default Component;
