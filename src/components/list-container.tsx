import { type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'

interface ListContainerProps {
  asChild?: boolean
  children: ReactNode
}
export const ListContainer = (props: ListContainerProps) => {
  const { asChild, children } = props
  const Component = asChild ? Slot : 'div'
  return (
    <Component className='grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {children}
    </Component>
  )
}
