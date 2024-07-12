import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { CustomContainer, Layout } from '@/components/atoms';
import '@uniswap/widgets/fonts.css';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>EEZY</title>
        <meta name="description" content="Revolutionizing cool apps." />
      </Head>

      <Layout>
        <Nav />

        <CustomContainer as="main">
          <div className="w-full">
            <div className="grid grid-cols-12 gap-4">
              <div className="w-full col-span-8">
                <p className="flex justify-center w-full gap-2 pt-4 font-extrabold text-2xl md:text-3xl mb-4"></p>
                <div className="mb-8"></div>
              </div>
            </div>
          </div>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}
