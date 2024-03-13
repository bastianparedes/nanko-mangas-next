import Images from './_components/Images';
import { serverClient } from '../../../../modules/trpc/serverClient';

const Page = async () => {
  const images = await serverClient.getImages({
    columns: ['descriptiveName', 'id', 'storedName', 'url']
  });

  return <Images initialImages={images} />;
};

export default Page;
