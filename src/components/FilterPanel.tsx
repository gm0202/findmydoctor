import { useState } from 'react';

interface FilterPanelProps {
  doctors: {
    specialities: { name: string }[];
  }[];
  filters: {
    consultationType: 'Video Consult' | 'In Clinic' | null;
    specialties: string[];
    sortBy: 'fee' | 'experience' | null;
    sortOrder: 'asc' | 'desc' | null;
  };
  onFilterChange: (filters: {
    consultationType?: 'Video Consult' | 'In Clinic' | null;
    specialties?: string[];
    sortBy?: 'fee' | 'experience' | null;
    sortOrder?: 'asc' | 'desc' | null;
  }) => void;
}

const FilterPanel = ({ doctors, filters, onFilterChange }: FilterPanelProps) => {
  // Get unique specialties from all doctors
  const allSpecialties = Array.from(
    new Set(doctors.flatMap(doctor => doctor.specialities.map(s => s.name)))
  ).sort();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Consultation Type Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Consultation Type</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="consultationType"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => onFilterChange({ consultationType: 'Video Consult' })}
              className="mr-2"
            />
            Video Consult
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="consultationType"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => onFilterChange({ consultationType: 'In Clinic' })}
              className="mr-2"
            />
            In Clinic
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="consultationType"
              checked={filters.consultationType === null}
              onChange={() => onFilterChange({ consultationType: null })}
              className="mr-2"
            />
            All
          </label>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Specialties</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {allSpecialties.map((specialty) => (
            <label key={specialty} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.specialties.includes(specialty)}
                onChange={(e) => {
                  const newSpecialties = e.target.checked
                    ? [...filters.specialties, specialty]
                    : filters.specialties.filter(s => s !== specialty);
                  onFilterChange({ specialties: newSpecialties });
                }}
                className="mr-2"
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="sortBy"
              checked={filters.sortBy === 'fee' && filters.sortOrder === 'asc'}
              onChange={() => onFilterChange({ sortBy: 'fee', sortOrder: 'asc' })}
              className="mr-2"
            />
            Fees (Low to High)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sortBy"
              checked={filters.sortBy === 'experience' && filters.sortOrder === 'desc'}
              onChange={() => onFilterChange({ sortBy: 'experience', sortOrder: 'desc' })}
              className="mr-2"
            />
            Experience (High to Low)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sortBy"
              checked={filters.sortBy === null}
              onChange={() => onFilterChange({ sortBy: null, sortOrder: null })}
              className="mr-2"
            />
            None
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 