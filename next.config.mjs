const nextConfig = {
  basePath: process.env.basePath ?? '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dl.dropbox.com'
      }
    ]
  }
};

export default nextConfig;
