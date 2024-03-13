'use client';

import { signOut } from 'next-auth/react';
import nextConfig from '../../../../next.config.mjs';
import path from 'path';

const Component = () => {
  const logout = () => {
    signOut({
      callbackUrl: path.join(nextConfig.basePath)
    });
  };

  return (
    <div className="flex bg-orange-400 p-4">
      <div className="flex items-center gap-5 grow content-start">
        <a
          href={path.join(nextConfig.basePath, '/admin/products')}
          className="p-3 bg-slate-500"
        >
          Admin products
        </a>
        <a
          className="p-3 bg-slate-500"
          href={path.join(nextConfig.basePath, '/admin/images')}
        >
          Admin images
        </a>
      </div>
      <div className="flex items-center grow justify-end">
        <button onClick={logout} className="p-3 bg-slate-500">
          End session
        </button>
      </div>
    </div>
  );
};

export default Component;
