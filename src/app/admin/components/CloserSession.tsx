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
  return <button onClick={logout}>Cerrar sesión</button>;
};

export default Component;
