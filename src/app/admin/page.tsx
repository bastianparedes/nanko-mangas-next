import dropbox from '../../../modules/fileSystem';
import CloserSession from './_components/CloserSession';
import Product from './_components/Products/Product';
import path from 'path';
import nextConfig from '../../../next.config.mjs';
import Products from './_components/Products';
import { serverClient } from '../_trpc/serverClient';

const Page = async () => {
  const products = await serverClient.getProducts({
    filterByName: '',
    includeNoStore: true,
    includeNoVisible: true,
    minPrice: null,
    maxPrice: null
  });

  const productsData = products.map((product) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.image?.url || null,
    priceNormal: product.priceNormal,
    priceOffer: product.priceOffer,
    visible: product.visible,
    quantity: product.quantity,
    id_image: product.id_image
  }));

  return (
    <>
      <CloserSession />
      <a href={path.join(nextConfig.basePath, '/admin/uploadImage')}>
        Subir imagen
      </a>
      <Products initialProducts={productsData} />
    </>
  );
};

export default Page;
