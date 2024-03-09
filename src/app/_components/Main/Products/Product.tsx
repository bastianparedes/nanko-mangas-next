/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import path from 'path';
import nextConfig from '../../../../../next.config.mjs';

const formatPrice = (number: number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const Price = ({
  priceNormal,
  priceOffer
}: {
  priceNormal: number;
  priceOffer: number | null;
}) => {
  if (priceOffer === null) {
    return (
      <span className="font-bold text-base">$ {formatPrice(priceNormal)}</span>
    );
  }

  const discount = 100 - Math.round((100 * priceOffer) / priceNormal);
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="font-bold text-base">$ {formatPrice(priceOffer)}</span>
        <span className="text-white py-0.5 px-1 bg-red-400 rounded text-xs">
          -{discount}%
        </span>
      </div>
      <span className="line-through text-gray-400 text-sm">
        $ {formatPrice(priceNormal)}
      </span>
    </>
  );
};

interface Props {
  data: {
    id: number;
    name: string;
    imageUrl: string | null;
    priceNormal: number;
    priceOffer: number | null;
  };
}

const Component = ({ data }: Props) => {
  const PHONE_NUMBER = process.env.PHONE_NUMBER ?? '';
  return (
    <div className="w-auto h-auto flex justify-center">
      <div className="flex justify-start flex-col w-52 md:w-32">
        <div className="flex justify-center items-center aspect-[1/1.61] w-auto overflow-hidden">
          <a
            className="w-full h-full"
            href={`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=Hola Nanko Mangas!, quiero comprar "${data.name}"`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={data.name}
              className="w-full h-full object-cover duration-[400ms] ease-in-out hover:scale-[1.2] md:hover:scale-[initial]"
              loading="lazy"
              src={data.imageUrl ?? undefined}
            />
          </a>
        </div>
        <span className="my-1 md:text-base/4">{data.id}</span>
        <Price priceNormal={data.priceNormal} priceOffer={data.priceOffer} />
      </div>
    </div>
  );
};

export default Component;
