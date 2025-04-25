import React, { useState, useEffect, useRef } from 'react';

interface Doctor {
  id: string;
  name: string;
}

interface AutoCompleteSearchProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
}

const AutoCompleteSearch: React.FC<AutoCompleteSearchProps> = ({ doctors, onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    setQuery(doctor.name);
    setShowSuggestions(false);
    onSearch(doctor.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      onSearch(query);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search doctors by name..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-0 left-0 w-full mt-12 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(doctor)}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteSearch; 