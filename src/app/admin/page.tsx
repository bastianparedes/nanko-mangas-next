import { redirect } from 'next/navigation';
import nextConfig from '../../../next.config.mjs';
import path from 'path';

const Page = () => {
  redirect(path.join(nextConfig.basePath, '/admin/products'));
};

export default Page;
