import { type ReactNode } from 'react'
interface SectionProps {
  title: string
  children: ReactNode
}
export const Section = (props: SectionProps) => {
  const { title, children } = props
  return (
    <section className='p-4 md:p-8'>
      <h1 className='mb-6 select-none text-center text-xl font-extrabold lg:mb-14 lg:text-5xl'>
        {title}
      </h1>
      {children}
    </section>
  )
}
