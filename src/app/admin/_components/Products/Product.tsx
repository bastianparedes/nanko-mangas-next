import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import imageNotFound from '../../../../../resources/images/not-found.webp';

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
    visible: boolean;
    quantity: number;
    id_image: number | null;
  };
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
          <Image
            alt={data.name}
            className="w-full h-full object-cover"
            loading="lazy"
            src={data.imageUrl ?? imageNotFound}
          />
        </div>
        <span className="my-1 md:text-base/4">{data.id}</span>
        <Price priceNormal={data.priceNormal} priceOffer={data.priceOffer} />
      </div>
    </div>
  );
};

export default Component;
