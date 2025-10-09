import Link from 'next/link';
import React from 'react';
import { storeConfig } from 'config/store-config';
import { auth0 } from 'lib/auth0';

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

async function NavDropdown() {
  const session = await auth0.getSession();

  if (!session?.user) {
    return (
      <li>
        <a href="/auth/login">My Orders</a>
      </li>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        {session.user.picture ? (
          <div className="w-8 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={session.user.picture}
            />
          </div>
        ) : (
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-8 rounded-full">
              <span className="text-xs">
                {session.user.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : 'U'}
              </span>
            </div>
          </div>
        )}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link href="/orders">My Orders</Link>
        </li>
        <li>
          <a href="/auth/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
}
