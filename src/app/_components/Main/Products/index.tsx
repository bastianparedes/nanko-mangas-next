import ids from '../../config/id';
import Product from './Product';

interface Props {
  productsData: {
    id: number;
    name: string;
    urlImage: string | null;
    priceNormal: number;
    priceOffer: number | null;
  }[];
}

const Component = ({ productsData }: Props) => {
  if (productsData.length === 0) return null;
  return (
    <section className="flex justify-center mt-7 px-2" id={ids.products}>
      <div className="pb-10 w-full">
        <h1 className="text-center text-4xl mb-5">Mangas disponibles</h1>
        <div className="grid gap-12 mt-3 grid-cols-[repeat(auto-fill,_minmax(min(100%,_15rem),_1fr))] lg:gap-5 md:gap-2 md:grid-cols-[repeat(auto-fill,_minmax(min(100%,_7rem),_1fr))]">
          {productsData.length > 0 ? (
            productsData.map((product) => (
              <Product key={product.id} data={product} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default Component;
