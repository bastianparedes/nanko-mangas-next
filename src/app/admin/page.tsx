import dropbox from '../../../lib/dropbox';
import CloserSession from './components/CloserSession';
import Product from './components/Product';
import path from 'path';
import nextConfig from '../../../next.config.mjs';

const Page = async () => {
  const products = JSON.parse(
    (
      (await dropbox.filesDownload({ path: '/data.json' })).result as any
    ).fileBinary.toString('utf-8')
  );

  const imageList = (
    await dropbox.filesListFolder({ path: '/images' })
  ).result.entries.map((result) => result.name);

  return (
    <>
      <CloserSession />
      <a href={path.join(nextConfig.basePath, '/admin/uploadImage')}>
        Subir imagen
      </a>
      <div className="grid gap-12 mt-3 grid-cols-[repeat(auto-fill,_minmax(min(100%,_15rem),_1fr))] lg:gap-5 md:gap-2 md:grid-cols-[repeat(auto-fill,_minmax(min(100%,_7rem),_1fr))]">
        {products.map((product: any) => (
          <Product
            key={product.name}
            name={product.name}
            picture={product.picture}
            price={product.price}
            priceSale={product.priceSale}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
