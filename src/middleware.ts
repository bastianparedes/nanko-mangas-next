export { default } from 'next-auth/middleware';
export const config = {
  matcher: ['/:prePath*/admin/:path*']
};
