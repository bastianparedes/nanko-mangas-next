import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { TrpcProvider } from '../_context/TrpcProvider';
import Nav from './_components/Nav';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nanko Mangas',
  description: 'Nanko Mangas'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={urbanist.className}>
        <TrpcProvider>
          <Nav />
          {children}
        </TrpcProvider>
      </body>
    </html>
  );
}
