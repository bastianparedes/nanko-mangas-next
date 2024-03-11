import dropbox from '../../modules/fileSystem';
import Header from './_components/Header';
import Hero from './_components/Main/Hero';
// import About from './_components/Main/About';
import Contact from './_components/Main/Contact';
import Products from './_components/Main/Products';
import Footer from './_components/Footer';
import { serverClient } from '../../modules/trpc/serverClient';

const Page = async () => {
  const products = await serverClient.getProducts({
    filterByName: '',
    includeNoStore: false,
    includeNoVisible: false,
    minPrice: 0,
    maxPrice: 99999
  });

  const productsData = products.map((product) => ({
    id: product.id,
    name: product.name,
    urlImage: product.urlImage,
    priceNormal: product.priceNormal,
    priceOffer: product.priceOffer
  }));

  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <About /> */}
        <Contact />
        <Products productsData={productsData} />
      </main>
      <Footer />
    </>
  );
};

export default Page;
