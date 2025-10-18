'use client';
import React from 'react';

export default function DepartmentFilter({ departments, selectedDept, onChange }) {
  return (
    <div className="mb-6">
      <label className="mr-3 font-medium text-gray-700">Filter by Department:</label>
      <select
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedDept}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Departments</option>
        {departments?.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
}
