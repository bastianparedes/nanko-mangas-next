import dropbox from '../../modules/fileSystem';
import Header from './components/Header';
import Hero from './components/Main/Hero';
import About from './components/Main/About';
import Contact from './components/Main/Contact';
import Products from './components/Main/Products';
import Footer from './components/Footer';

const Page = async () => {
  const response = await dropbox.filesDownload({ path: '/data.json' });

  const contenidoBuffer = (response.result as any).fileBinary;
  const contenidoString = contenidoBuffer.toString('utf-8');
  const productsData = JSON.parse(contenidoString);

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
