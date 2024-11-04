import React from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  type: 'task' | 'equipment' | 'document';
  url: string;
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setQuery(value);
    // Simulate search results
    if (value.length > 2) {
      setResults([
        {
          id: '1',
          title: 'Equipment Maintenance Task',
          type: 'task',
          url: '/tasks/1',
        },
        {
          id: '2',
          title: 'CNC Machine Manual',
          type: 'document',
          url: '/documents/2',
        },
      ]);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    navigate(result.url);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.length > 0 ? (
              results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {result.title}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      {result.type}
                    </span>
                  </div>
                </button>
              ))
            ) : query.length > 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                No results found
              </div>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                Start typing to search...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}