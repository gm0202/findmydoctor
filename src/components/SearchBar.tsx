import { useState, useEffect, useRef } from 'react';
import { Doctor } from '../types';

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
}

export const SearchBar = ({ doctors, onSearch }: SearchBarProps) => {
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

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const matches = doctors
      .filter(doctor =>
        doctor.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 3);

    setSuggestions(matches);
  }, [query, doctors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    onSearch(value);
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    setQuery(doctor.name);
    setShowSuggestions(false);
    onSearch(doctor.name);
  };

  return (
    <div className="bg-blue-900 p-4" ref={searchRef}>
      <div className="relative w-full max-w-4xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          data-testid="autocomplete-input"
          className="w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute w-full bg-white mt-1 rounded-md shadow-lg z-10">
            {suggestions.map((doctor) => (
              <li
                key={doctor.id}
                onClick={() => handleSuggestionClick(doctor)}
                data-testid="suggestion-item"
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}; 