import React from 'react';
import { useDoctors } from './hooks/useDoctors';
import DoctorCard from './components/DoctorCard';
import AutoCompleteSearch from './components/AutoCompleteSearch';
import FilterPanel from './components/FilterPanel';

function App() {
  const { doctors, loading, error, filters, updateFilters } = useDoctors();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading doctors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Find a Doctor</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <AutoCompleteSearch
            doctors={doctors}
            onSearch={(query) => updateFilters({ searchQuery: query })}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Panel */}
          <div className="w-full md:w-1/4">
            <FilterPanel
              doctors={doctors}
              filters={filters}
              onFilterChange={updateFilters}
            />
          </div>

          {/* Doctors List */}
          <div className="w-full md:w-3/4 space-y-6">
            {doctors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No doctors found matching your criteria.</p>
              </div>
            ) : (
              doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 