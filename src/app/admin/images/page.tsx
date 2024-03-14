import ImageCards from './_components/ImageCards';
import { serverClient } from '../../../../modules/trpc/serverClient';

const Page = async () => {
  const images = await serverClient.getImages({
    columns: ['descriptiveName', 'id', 'storedName', 'url']
  });

  return <ImageCards initialImages={images} />;
};

export default Page;
