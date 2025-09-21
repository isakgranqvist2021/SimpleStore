import Link from 'next/link';
import React from 'react';
import NavDropdown from './nav-dropdown';
import { storeConfig } from 'config/store-config';

export function Nav() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="container flex justify-between items-center mx-auto">
        <Link href="/" className="btn btn-ghost text-xl">
          {storeConfig.name}
        </Link>

        <ul className="menu menu-horizontal px-1">
          <NavDropdown />
        </ul>
      </div>
    </div>
  );
}
