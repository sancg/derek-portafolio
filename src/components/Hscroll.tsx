// components/HorizontalScroll.tsx
import { cn } from '../utils/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function HorizontalScroll({ children, className }: Props) {
  return (
    <div className={cn('relative overflow-x-auto scroll-smooth', className)}>
      <div className='flex gap-6 overflow-x-auto p-4 snap-proximity scroll-smooth scroll-container'>
        {children}
      </div>

      {/* Fade indicator */}
      <div className='pointer-events-none absolute right-0 top-0 h-full w-16' />
    </div>
  );
}
