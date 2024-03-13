import Products from './_components/Products';
import { serverClient } from '../../../../modules/trpc/serverClient';

const Page = async () => {
  const products = await serverClient.getProducts({
    columns: ['name', 'priceNormal', 'priceOffer', 'visible', 'idImage', 'id'],
    config: {
      filterByName: '',
      includeNoStore: true,
      includeNoVisible: true,
      minPrice: null,
      maxPrice: null,
      includeNoUrl: true
    }
  });

  const images = await serverClient.getImages({
    columns: ['id', 'descriptiveName', 'url']
  });

  return <Products initialProducts={products} images={images} />;
};

export default Page;
