import { Footer } from 'components/footer';
import { Nav } from 'components/nav';
import React from 'react';
import { Toaster } from 'sonner';
import 'styles/globals.css';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html data-theme="lofi" lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />

        <Toaster richColors />

        <main className="flex-grow">{props.children}</main>

        <Footer />
      </body>
    </html>
  );
}
