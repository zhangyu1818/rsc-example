import Link, { type LinkProps } from 'next/link'
import React from 'react'

import { Cart } from '@/components/cart'
import { ThemeToggle } from '@/components/ui/theme-toggle'

interface NavbarLinkProps extends LinkProps {
  children: string
}

const NavbarLink = (props: NavbarLinkProps) => (
  <Link
    className='block rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none md:px-4 md:py-2 md:text-base'
    {...props}
  />
)

export const Navbar = () => {
  return (
    <nav className='sticky top-0 z-10 flex items-center gap-2 bg-background/85 px-2 py-1 backdrop-blur md:px-6 md:py-4'>
      <ul className='flex flex-1 gap-2 font-semibold md:gap-6'>
        <li>
          <NavbarLink href='/'>Home</NavbarLink>
        </li>
        <li>
          <NavbarLink href='/collections/men'>Men</NavbarLink>
        </li>
        <li>
          <NavbarLink href='/collections/women'>Women</NavbarLink>
        </li>
        <li>
          <NavbarLink href='/products'>Products</NavbarLink>
        </li>
        <li>
          <NavbarLink href='/collections'>Collections</NavbarLink>
        </li>
      </ul>
      <ThemeToggle />
      <Cart />
    </nav>
  )
}
