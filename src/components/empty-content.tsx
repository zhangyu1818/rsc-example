import { ArchiveIcon } from '@radix-ui/react-icons'

import { cn } from '@/utils/shadcn'

interface EmptyContentProps {
  className?: string
  title: string
}
export const EmptyContent = (props: EmptyContentProps) => {
  const { className, title } = props
  return (
    <div className={cn('flex flex-col items-center gap-6 p-9', className)}>
      <ArchiveIcon className='h-20 w-20' />
      <h2 className='text-xl'>{title}</h2>
    </div>
  )
}
