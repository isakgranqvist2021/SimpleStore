import { Nav } from 'components/nav';
import React from 'react';
import { Toaster } from 'sonner';
import 'styles/globals.css';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html data-theme="lofi" lang="en">
      <body>
        <Nav />

        <Toaster richColors />

        <main>{props.children}</main>
      </body>
    </html>
  );
}
