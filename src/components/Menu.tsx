"use client";

import Link from 'next/link';
import { useAppData } from '@lib';

export const Menu = () => {
  const { role } = useAppData(); // Access the role to show/hide Manage link

  return (
    <nav className="flex justify-between items-center bg-white shadow-lg p-4">
      <div className="space-x-4">
        <Link href="/" passHref>
          <button className="text-gray-600 hover:text-gray-800">Home</button>
        </Link>
        <Link href="/projects" passHref>
          <button className="text-gray-600 hover:text-gray-800">Projects</button>
        </Link>
        {role === 'admin' && (
          <Link href="/manager" passHref>
            <button className="text-gray-600 hover:text-gray-800">Manage</button>
          </Link>
        )}
        <Link href="/account" passHref>
          <button className="text-gray-600 hover:text-gray-800">Account</button>
        </Link>
      </div>
    </nav>
  );
};
