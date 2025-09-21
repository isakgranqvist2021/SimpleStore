import { Footer } from 'components/footer';
import { Nav } from 'components/nav';
import { globalBanner, storeConfig } from 'config/store-config';
import { Metadata } from 'next';
import React from 'react';
import { Toaster } from 'sonner';
import 'styles/globals.css';
import { getPageTitle } from 'config/store-config';
import { Banner } from 'components/banner';

export const metadata: Metadata = {
  title: getPageTitle(),
  description: storeConfig.description,
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html data-theme="lofi" lang="en">
      <body className="min-h-screen flex flex-col">
        {globalBanner.enabled && <Banner>{globalBanner.text}</Banner>}

        <Nav />

        <Toaster richColors />

        <main className="flex-grow">{props.children}</main>

        <Footer />
      </body>
    </html>
  );
}
