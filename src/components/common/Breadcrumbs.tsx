import React from 'react';
import { Link } from '../../context/RouterContext';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumbs" className={`flex items-center gap-1.5 text-xs text-stone-500 ${className}`}>
      <Link to="/" className="hover:text-stone-900 transition-colors">
        Home
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
            {isLast || !item.to ? (
              <span className="text-stone-900 font-medium truncate max-w-[200px] md:max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="hover:text-stone-900 transition-colors">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
