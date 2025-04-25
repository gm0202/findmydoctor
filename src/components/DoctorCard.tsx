import React from 'react';

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

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start">
        {/* Doctor Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-gray-600 mt-1">{doctor.doctor_introduction}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{doctor.fees}</p>
              <p className="text-sm text-gray-500">Consultation Fee</p>
            </div>
          </div>

          {/* Specialties */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {doctor.specialities.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {specialty.name}
                </span>
              ))}
            </div>
          </div>

          {/* Experience and Languages */}
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <span className="mr-4">
              <span className="font-semibold">{doctor.experience}</span> years experience
            </span>
            <span>
              Speaks: {doctor.languages.join(', ')}
            </span>
          </div>

          {/* Clinic Info */}
          <div className="mt-4">
            <div className="flex items-center">
              <img
                src={doctor.clinic.address.logo_url}
                alt={doctor.clinic.name}
                className="w-6 h-6 mr-2"
              />
              <div>
                <p className="font-medium">{doctor.clinic.name}</p>
                <p className="text-sm text-gray-600">
                  {doctor.clinic.address.address_line1}, {doctor.clinic.address.locality}, {doctor.clinic.address.city}
                </p>
              </div>
            </div>
          </div>

          {/* Consultation Types */}
          <div className="mt-6 flex gap-4">
            {doctor.video_consult && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Video Consult
              </button>
            )}
            {doctor.in_clinic && (
              <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                In Clinic
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 