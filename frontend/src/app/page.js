// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { gql } from '@apollo/client';
// import { useQuery } from '@apollo/client/react';

// const GET_ALL_EMPLOYEES = gql`
//   query {
//     getAllEmployees {
//       id
//       name
//       position
//       department {
//         id
//         name
//       }
//     }
//   }
// `;

// const GET_DEPARTMENTS = gql`
//   query {
//     getDepartments {
//       id
//       name
//     }
//   }
// `;

// export default function HomePage() {
//   const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);
//   const { data: deptData } = useQuery(GET_DEPARTMENTS);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedDept, setSelectedDept] = useState('');

//   useEffect(() => {
//     if (data?.getAllEmployees) {
//       if (selectedDept) {
//         setFilteredEmployees(
//           data.getAllEmployees.filter(
//             (emp) => emp.department?.id === selectedDept
//           )
//         );
//       } else {
//         setFilteredEmployees(data.getAllEmployees);
//       }
//     }
//   }, [data, selectedDept]);

//   if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-3 md:mb-0">Employee Directory</h1>
//         <Link href="/employee/add">
//           <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
//             + Add New Employee
//           </button>
//         </Link>
//       </div>

//       {/* Department Filter */}
//       <div className="mb-6">
//         <label className="mr-3 font-medium text-gray-700">Filter by Department:</label>
//         <select
//           className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={selectedDept}
//           onChange={(e) => setSelectedDept(e.target.value)}
//         >
//           <option value="">All Departments</option>
//           {deptData?.getDepartments.map((d) => (
//             <option key={d.id} value={d.id}>
//               {d.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Employee Table */}
//       <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
//         <table className="min-w-full bg-white divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
//                 Position
//               </th>
//               <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
//                 Department
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filteredEmployees.map((emp) => (
//               <tr
//                 key={emp.id}
//                 className="hover:bg-gray-50 cursor-pointer transition"
//                 onClick={() => (window.location.href = `/employee/${emp.id}`)}
//               >
//                 <td className="px-6 py-4 text-gray-800">{emp.name}</td>
//                 <td className="px-6 py-4 text-gray-600">{emp.position}</td>
//                 <td className="px-6 py-4 text-gray-600">{emp.department?.name || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import DepartmentFilter from '@/components/DepartmentFilter';

const GET_ALL_EMPLOYEES = gql`
  query {
    getAllEmployees {
      id
      name
      position
      department {
        id
        name
      }
    }
  }
`;

const GET_DEPARTMENTS = gql`
  query {
    getDepartments {
      id
      name
    }
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);
  const { data: deptData } = useQuery(GET_DEPARTMENTS);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');

  useEffect(() => {
    if (data?.getAllEmployees) {
      if (selectedDept) {
        setFilteredEmployees(
          data.getAllEmployees.filter((emp) => emp.department?.id === selectedDept)
        );
      } else {
        setFilteredEmployees(data.getAllEmployees);
      }
    }
  }, [data, selectedDept]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 md:mb-0">Employee Directory</h1>
        <Link href="/employee/add">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            + Add New Employee
          </button>
        </Link>
      </div>

      {/* Department Filter */}
      <DepartmentFilter
        departments={deptData?.getDepartments}
        selectedDept={selectedDept}
        onChange={setSelectedDept}
      />

      {/* Employee Table */}
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
                Position
              </th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
                Department
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-gray-50 cursor-pointer transition"
                onClick={() => (window.location.href = `/employee/${emp.id}`)}
              >
                <td className="px-6 py-4 text-gray-800">{emp.name}</td>
                <td className="px-6 py-4 text-gray-600">{emp.position}</td>
                <td className="px-6 py-4 text-gray-600">{emp.department?.name || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
