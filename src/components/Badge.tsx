import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  category: string;
  className?: string;
}

export default function Badge({ category, className }: BadgeProps) {
  const getColors = (cat: string) => {
    switch (cat.toUpperCase()) {
      case 'IA':
        return 'bg-blue-100 text-blue-600';
      case 'WEB':
      case 'WEB APP':
        return 'bg-orange-100 text-orange-600';
      case 'CONSULTING':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
      getColors(category),
      className
    )}>
      {category}
    </span>
  );
}
