import ids from '../../config/id';
import Image from 'next/image';
import heroImage from './heroPicture.png';

const Component = () => {
  return (
    <section
      className="w-full pt-32 px-10 pb-12 flex gap-20 justify-center items-center lg:px-5 lg:pt-36 lg:gap-0 md:pt-24 md:flex-col md:gap-10"
      id={ids.hero}
    >
      <div className="flex flex-col w-1/3 gap-10 lg:w-1/2 md:w-auto md:gap-5">
        <h1 className="text-6xl font-bold md:text-5xl">
          Si estás en{' '}
          <span className="bg-gradient-to-bl from-white to-black bg-clip-text text-transparent">
            Puerto Montt
          </span>
          , tu{' '}
          <span className="bg-gradient-to-bl from-white to-black bg-clip-text text-transparent">
            Manga
          </span>{' '}
          también
        </h1>
        <p className="text-2xl md:text-xl">
          Compra tu manga favorito en los alrededores de Puerto Montt y eventos
          para los amantes del anime
        </p>
        <div className="flex gap-8">
          <a
            className="border-2 border-solid border-orange-400 bg-orange-400 text-white text-center rounded-lg py-3 px-6 text-lg font-semibold no-underline lg:px-2"
            href={'#' + ids.products}
          >
            Ver mangas
          </a>
          <a
            className="border-2 border-solid border-orange-400 bg-white text-orange-400 text-center rounded-lg py-3 px-6 text-lg font-semibold no-underline  lg:px-2"
            href={'#' + ids.contact}
          >
            Contáctame
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/3 aspect-square lg:w-1/2 md:w-auto">
        <Image
          alt="Product"
          className="object-cover w-full h-full"
          placeholder="blur"
          src={heroImage}
        />
      </div>
    </section>
  );
};

export default Component;
