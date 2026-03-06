import React from "react";

const ViewDoctorModal = ({ doctor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Doctor Profile</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* Doctor Info */}
        <div className="flex gap-4 items-center mb-6">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <p className="text-xl font-medium">{doctor.name}</p>
            <p className="text-sm text-gray-500">
              {doctor.degree} • {doctor.speciality}
            </p>
            <p className="text-sm text-gray-500">
              Experience: {doctor.experience}
            </p>
          </div>
        </div>

        {/* About */}
        <Section title="About">
          {doctor.about || "No description provided"}
        </Section>

        {/* Fees */}
        <Section title="Consultation Fees">
          ₹ {doctor.fees}
        </Section>

        {/* Address */}
        <Section title="Address">
          {doctor.address?.line1}
          <br />
          {doctor.address?.line2}
        </Section>

        {/* Availability */}
        <Section title="Availability">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm ${
              doctor.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {doctor.available ? "Available" : "Not Available"}
          </span>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
    <div className="text-sm text-gray-600">{children}</div>
  </div>
);

export default ViewDoctorModal;
