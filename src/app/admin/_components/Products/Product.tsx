import Image from 'next/image';
import imageNotFound from '../../../../../resources/images/not-found.webp';

interface Props {
  data: {
    name: string;
    priceNormal: number;
    priceOffer: number | null;
    visible: boolean;
    quantity: number;
    idImage: number | null;
    id: number;
    urlImage: string | null;
  };
}

const Component = ({ data }: Props) => {
  return (
    <div className="w-auto h-auto flex justify-center">
      <div className="flex justify-start flex-col w-52 md:w-32">
        <div className="flex justify-center items-center aspect-[1/1.61] w-auto overflow-hidden">
          <Image
            alt={data.name}
            className="w-full h-full object-cover"
            loading="lazy"
            src={data.urlImage ?? imageNotFound}
          />
        </div>
        <span className="my-1 md:text-base/4">Name: {data.name}</span>
        <span className="my-1 md:text-base/4">
          Normal price: {data.priceNormal}
        </span>
        <span className="my-1 md:text-base/4">
          Normal offer: {String(data.priceOffer)}
        </span>
      </div>
    </div>
  );
};

export default Component;
