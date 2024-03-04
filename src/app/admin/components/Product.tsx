/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import path from 'path';
import nextConfig from '../../../../next.config.mjs';

interface Props {
  name: string;
  picture: string;
  price: number;
  priceSale: number | undefined;
}

const formatPrice = (number: number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const Price = ({
  price,
  priceSale
}: {
  price: Props['price'];
  priceSale: Props['priceSale'];
}) => {
  if (priceSale === undefined) {
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

const Component = ({ name, picture, price, priceSale }: Props) => {
  const PHONE_NUMBER = process.env.PHONE_NUMBER ?? '';
  return (
    <div className="w-auto h-auto flex justify-center">
      <div className="flex justify-start flex-col w-52 md:w-32">
        <div className="flex justify-center items-center aspect-[1/1.61] w-auto overflow-hidden">
          <img
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            src={
              path.join(nextConfig.basePath, '/api/image') +
              '?fileName=' +
              picture
            }
          />
        </div>
        <span className="my-1 md:text-base/4">{name}</span>
        <Price price={price} priceSale={priceSale} />
      </div>
    </div>
  );
};

export default Component;
