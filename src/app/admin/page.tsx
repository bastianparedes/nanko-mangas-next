import dropbox from '../../../modules/fileSystem';
import CloserSession from './_components/CloserSession';
import Product from './_components/Products/Product';
import path from 'path';
import nextConfig from '../../../next.config.mjs';
import Products from './_components/Products';
import { serverClient } from '../../../modules/trpc/serverClient';

const Page = async () => {
  const products = await serverClient.getProducts({
    columns: ['name', 'priceNormal', 'priceOffer', 'visible', 'idImage', 'id'],
    config: {
      filterByName: '',
      includeNoStore: true,
      includeNoVisible: true,
      minPrice: null,
      maxPrice: null
    }
  });

  const images = await serverClient.getImages({
    columns: ['id', 'descriptiveName', 'url']
  });

  return (
    <>
      <CloserSession />
      <a href={path.join(nextConfig.basePath, '/admin/uploadImage')}>
        Upload image
      </a>
      <Products initialProducts={products} images={images} />
    </>
  );
};

export default Page;
