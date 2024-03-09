import dropbox from '../../modules/fileSystem';
import Header from './_components/Header';
import Hero from './_components/Main/Hero';
// import About from './_components/Main/About';
import Contact from './_components/Main/Contact';
import Products from './_components/Main/Products';
import Footer from './_components/Footer';
import db from 

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
