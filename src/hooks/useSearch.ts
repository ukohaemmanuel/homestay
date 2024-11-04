import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  options?: {
    debounceMs?: number;
  }
) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, options?.debounceMs || 300);

  const filteredItems = useCallback(
    (customQuery?: string) => {
      const searchQuery = (customQuery ?? debouncedQuery).toLowerCase();
      if (!searchQuery) return items;

      return items.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchQuery);
          }
          return false;
        })
      );
    },
    [items, searchFields, debouncedQuery]
  );

  return {
    query,
    setQuery,
    filteredItems,
  };
}