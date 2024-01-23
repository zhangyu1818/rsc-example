import { Suspense, type ReactNode } from 'react'

import { Inter } from 'next/font/google'
import { clsx } from 'clsx'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

import { Providers } from '@/providers'

import { type Metadata } from 'next'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Shop',
    template: `%s | Shop`,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body className={clsx(inter.className, 'flex min-h-screen flex-col')}>
        <Providers>
          <Navbar />
          <Suspense>
            <main className='flex flex-1 flex-col gap-2 lg:gap-8'>
              {children}
            </main>
          </Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
