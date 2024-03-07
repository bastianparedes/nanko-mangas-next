import dropbox from '../../../modules/dropbox';
import CloserSession from './components/CloserSession';
import Product from './components/Products/Product';
import path from 'path';
import nextConfig from '../../../next.config.mjs';
import Products from './components/Products';

const Page = async () => {
  const initialProducts = JSON.parse(
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
      <Products initialProducts={initialProducts} />
    </>
  );
};

export default Page;
