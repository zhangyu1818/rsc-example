import Link from 'next/link'

import { Cart } from '@/components/cart'
export const Navbar = () => (
  <nav className='sticky top-0 z-10 flex items-center bg-white px-6 py-4'>
    <ul className='flex flex-1 gap-6 font-semibold'>
      <li>
        <Link className='block p-4 underline-offset-2 hover:underline' href='/'>
          Home
        </Link>
      </li>
      <li>
        <Link
          className='block p-4 underline-offset-2 hover:underline'
          href='/collections/men'
        >
          Men
        </Link>
      </li>
      <li>
        <Link
          className='block p-4 underline-offset-2 hover:underline'
          href='/collections/women'
        >
          Women
        </Link>
      </li>
      <li>
        <Link
          className='block p-4 underline-offset-2 hover:underline'
          href='/collections'
        >
          Collections
        </Link>
      </li>
    </ul>
    <Cart />
  </nav>
)
