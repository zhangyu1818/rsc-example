import { type PropsWithChildren } from 'react'

import { ThemeProvider } from './theme-provider'
import { QueryProvider } from './query-provider'

export const Providers = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  )
}
