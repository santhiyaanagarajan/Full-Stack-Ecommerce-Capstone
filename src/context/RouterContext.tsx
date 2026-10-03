import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
  query: Record<string, string>;
}

interface RouterContextType {
  route: RouteState;
  navigate: (to: string) => void;
  currentPath: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function parseHash(hashStr: string): RouteState {
  // Normalize hash, e.g. "#/product/aura-soundstone-one?ref=home" -> path="/product/aura-soundstone-one", query={ref:"home"}
  let raw = hashStr.replace(/^#/, '');
  if (!raw || raw === '') {
    raw = '/';
  }
  if (!raw.startsWith('/')) {
    raw = '/' + raw;
  }

  const [pathPart, queryPart] = raw.split('?');
  const query: Record<string, string> = {};
  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    searchParams.forEach((val, key) => {
      query[key] = val;
    });
  }

  const params: Record<string, string> = {};
  // Match dynamic routes like /product/:slug
  const productMatch = pathPart.match(/^\/product\/([^/]+)$/);
  if (productMatch) {
    params.slug = productMatch[1];
  }

  return {
    path: pathPart,
    params,
    query,
  };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(() => parseHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    let target = to;
    if (!target.startsWith('#')) {
      target = '#' + (target.startsWith('/') ? target : '/' + target);
    }
    if (window.location.hash === target) {
      // Re-trigger scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = target;
    }
  }, []);

  return (
    <RouterContext.Provider value={{ route, navigate, currentPath: route.path }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

export const Link: React.FC<{
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
}> = ({ to, className = '', children, onClick, 'aria-label': ariaLabel }) => {
  const { navigate, currentPath } = useRouter();
  const normalizedTo = to.startsWith('#') ? to.slice(1) : to;
  const isActive = currentPath === normalizedTo;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    navigate(to);
  };

  const href = to.startsWith('#') ? to : '#' + (to.startsWith('/') ? to : '/' + to);

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
};
