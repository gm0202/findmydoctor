import { useState, useEffect } from 'react';

interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: { name: string }[];
  fees: string;
  experience: string;
  languages: string[];
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url: string;
    };
  };
  video_consult: boolean;
  in_clinic: boolean;
}

interface Filters {
  searchQuery: string;
  consultationType: 'Video Consult' | 'In Clinic' | null;
  specialties: string[];
  sortBy: 'fee' | 'experience' | null;
  sortOrder: 'asc' | 'desc' | null;
}

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    consultationType: null,
    specialties: [],
    sortBy: null,
    sortOrder: null,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredDoctors = doctors.filter(doctor => {
    // Search filter
    if (filters.searchQuery && !doctor.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    // Consultation type filter
    if (filters.consultationType === 'Video Consult' && !doctor.video_consult) {
      return false;
    }
    if (filters.consultationType === 'In Clinic' && !doctor.in_clinic) {
      return false;
    }

    // Specialties filter
    if (filters.specialties.length > 0) {
      const doctorSpecialties = doctor.specialities.map(s => s.name);
      if (!filters.specialties.some(specialty => doctorSpecialties.includes(specialty))) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (!filters.sortBy) return 0;

    if (filters.sortBy === 'fee') {
      const feeA = parseInt(a.fees.replace('₹ ', ''));
      const feeB = parseInt(b.fees.replace('₹ ', ''));
      return filters.sortOrder === 'asc' ? feeA - feeB : feeB - feeA;
    }

    if (filters.sortBy === 'experience') {
      const expA = parseInt(a.experience);
      const expB = parseInt(b.experience);
      return filters.sortOrder === 'asc' ? expA - expB : expB - expA;
    }

    return 0;
  });

  return {
    doctors: filteredDoctors,
    loading,
    error,
    filters,
    updateFilters,
  };
}; 