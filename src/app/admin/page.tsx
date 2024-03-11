import dropbox from '../../../modules/fileSystem';
import CloserSession from './_components/CloserSession';
import Product from './_components/Products/Product';
import path from 'path';
import nextConfig from '../../../next.config.mjs';
import Products from './_components/Products';
import { serverClient } from '../../../modules/trpc/serverClient';

const Page = async () => {
  const products = await serverClient.getProducts({
    columns: [
      'name',
      'priceNormal',
      'priceOffer',
      'visible',
      'quantity',
      'idImage',
      'id',
      'urlImage'
    ],
    config: {
      filterByName: '',
      includeNoStore: true,
      includeNoVisible: true,
      minPrice: null,
      maxPrice: null
    }
  });

  return (
    <>
      <CloserSession />
      <a href={path.join(nextConfig.basePath, '/admin/uploadImage')}>
        Upload image
      </a>
      <Products initialProducts={products} />
    </>
  );
};

export default Page;
