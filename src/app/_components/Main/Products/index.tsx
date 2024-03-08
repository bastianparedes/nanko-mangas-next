import ids from '../../config/id';
import Product from './Product';
import type { Product as TypeProduct } from '../../../../../types';

interface Props {
  productsData: TypeProduct[];
}

const Component = ({ productsData }: Props) => {
  return (
    <section className="flex justify-center mt-7 px-2" id={ids.products}>
      <div className="pb-10 w-full">
        <h1 className="text-center text-4xl mb-5">Mangas disponibles</h1>
        <div className="grid gap-12 mt-3 grid-cols-[repeat(auto-fill,_minmax(min(100%,_15rem),_1fr))] lg:gap-5 md:gap-2 md:grid-cols-[repeat(auto-fill,_minmax(min(100%,_7rem),_1fr))]">
          {productsData.length > 0 ? (
            productsData.map((product, index) => (
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
