import { Suspense } from 'react'

import { Inter } from 'next/font/google'

import { Navbar } from '@/components/navbar'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  )
}
