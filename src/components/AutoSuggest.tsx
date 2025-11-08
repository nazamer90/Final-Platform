import React, { useEffect, useRef, useState } from 'react';
import { Search, Clock, TrendingUp, X } from 'lucide-react';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { allStoreProducts } from '@/data/allStoreProducts';

interface SearchHistoryItem {
  query: string;
  timestamp: number;
  resultCount: number;
}

interface AutoSuggestProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface SuggestionItem {
  text: string;
  type: 'history' | 'trending' | 'product' | 'category';
  count?: number;
  category?: string;
}

const AutoSuggest: React.FC<AutoSuggestProps> = ({
  value,
  onChange,
  onSelect,
  placeholder = "ابحث ع تج...",
  className = ""
}) => {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Search history management
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    const saved = localStorage.getItem('eshro_search_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Trending searches (mock data - in real app, this would come from analytics)
  const trendingSearches = [
    { query: 'اتف ذ', count: 1250 },
    { query: 'ابس راضة', count: 890 },
    { query: 'أحذة', count: 756 },
    { query: 'ساعة ذة', count: 634 },
    { query: 'حاسب ح', count: 523 }
  ];

  // Generate suggestions based on input
  useEffect(() => {
    if (value.length === 0) {
      // Show trending and recent searches when input is empty
      const recentSuggestions: SuggestionItem[] = searchHistory
        .slice(0, 3)
        .map(item => ({
          text: item.query,
          type: 'history' as const,
          count: item.resultCount
        }));

      const trendingSuggestions: SuggestionItem[] = trendingSearches
        .slice(0, 3)
        .map(item => ({
          text: item.query,
          type: 'trending' as const,
          count: item.count
        }));

      setSuggestions([...recentSuggestions, ...trendingSuggestions]);
    } else if (value.length >= 2) {
      // Generate suggestions based on input
      const newSuggestions: SuggestionItem[] = [];

      // Product name matches
      const productMatches = allStoreProducts
        .filter(product =>
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.category?.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5)
        .map(product => ({
          text: product.name,
          type: 'product' as const,
          category: product.category
        }));

      // Category matches
      const categoryMatches = [...new Set(allStoreProducts.map(p => p.category))]
        .filter(category =>
          category?.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3)
        .map(category => ({
          text: category,
          type: 'category' as const
        }));

      // History matches
      const historyMatches = searchHistory
        .filter(item =>
          item.query.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 2)
        .map(item => ({
          text: item.query,
          type: 'history' as const,
          count: item.resultCount
        }));

      newSuggestions.push(...productMatches, ...categoryMatches, ...historyMatches);
      setSuggestions(newSuggestions.slice(0, 8)); // Limit to 8 suggestions
    } else {
      setSuggestions([]);
    }
  }, [value, searchHistory, trendingSearches]);

  // Save search to history
  const saveToHistory = (query: string, resultCount: number) => {
    const newHistoryItem: SearchHistoryItem = {
      query,
      timestamp: Date.now(),
      resultCount
    };

    const updatedHistory = [
      newHistoryItem,
      ...searchHistory.filter(item => item.query !== query)
    ].slice(0, 10); // Keep only last 10 searches

    setSearchHistory(updatedHistory);
    localStorage.setItem('eshro_search_history', JSON.stringify(updatedHistory));
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('eshro_search_history');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length && suggestions[selectedIndex]) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionSelect = (suggestion: SuggestionItem) => {
    onChange(suggestion.text);
    onSelect(suggestion.text);
    setShowSuggestions(false);
    setSelectedIndex(-1);

    // Save to history if it's a search action
    if (suggestion.type === 'product' || suggestion.type === 'category') {
      const resultCount = allStoreProducts.filter(product =>
        product.name.toLowerCase().includes(suggestion.text.toLowerCase()) ||
        product.category?.toLowerCase().includes(suggestion.text.toLowerCase())
      ).length;
      saveToHistory(suggestion.text, resultCount);
    }
  };

  const handleSearch = () => {
    if (value.trim()) {
      const resultCount = allStoreProducts.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category?.toLowerCase().includes(value.toLowerCase())
      ).length;
      saveToHistory(value.trim(), resultCount);
      onSelect(value.trim());
      setShowSuggestions(false);
    }
  };

  const getSuggestionIcon = (type: SuggestionItem['type']) => {
    switch (type) {
      case 'history':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case 'product':
        return <Search className="h-4 w-4 text-blue-500" />;
      case 'category':
        return <Search className="h-4 w-4 text-green-500" />;
      default:
        return <Search className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSuggestionLabel = (suggestion: SuggestionItem) => {
    switch (suggestion.type) {
      case 'history':
        return suggestion.count ? `${suggestion.count} تجة` : 'بحث ساب';
      case 'trending':
        return suggestion.count ? `شائع (${suggestion.count})` : 'شائع';
      case 'product':
        return suggestion.category ? `تج  ${suggestion.category}` : 'تج';
      case 'category':
        return 'فئة';
      default:
        return '';
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4"
        />
        {value && (
          <button type="button" onClick={() => {
              onChange('');
              setShowSuggestions(false);
              setSelectedIndex(-1);
            }}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            aria-label="سح اص"
            title="سح اص"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto shadow-lg border"
        >
          <CardContent className="p-0">
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.type}-${suggestion.text}-${index}`}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={`w-full px-4 py-3 text-right hover:bg-gray-50 flex items-center justify-between transition-colors ${
                    index === selectedIndex ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getSuggestionIcon(suggestion.type)}
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {suggestion.text}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getSuggestionLabel(suggestion)}
                      </div>
                    </div>
                  </div>
                  {suggestion.type === 'trending' && (
                    <Badge variant="secondary" className="text-xs">
                      شائع
                    </Badge>
                  )}
                </button>
              ))}

              {/* Clear History Option */}
              {value.length === 0 && searchHistory.length > 0 && (
                <div className="border-t mt-2 pt-2">
                  <button type="button" onClick={clearHistory}
                    className="w-full px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-center"
                  >
                    سح تارخ ابحث
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results Message */}
      {showSuggestions && value.length >= 2 && suggestions.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border">
          <CardContent className="p-4 text-center text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p> ت اعثر ع اتراحات</p>
            <p className="text-sm">جرب ات ختفة</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutoSuggest;
