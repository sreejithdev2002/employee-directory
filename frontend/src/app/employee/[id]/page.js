"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_EMPLOYEE_DETAILS = gql`
  query getEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      salary
      department {
        id
        name
        floor
      }
    }
  }
`;

export default function EmployeeDetails() {
  const { id } = useParams();
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  const emp = data.getEmployeeDetails;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg border border-gray-200">
      {/* Back Button */}
      <button
        className="mb-6 text-blue-600 hover:underline"
        onClick={() => router.push("/")}
      >
        &larr; Back
      </button>

      {/* Employee Details */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{emp.name}</h1>
      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Position:</span> {emp.position}
        </p>
        <p>
          <span className="font-semibold">Salary:</span> ₹{emp.salary}
        </p>
        <p>
          <span className="font-semibold">Department:</span>{" "}
          {emp.department?.name || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Floor:</span>{" "}
          {emp.department?.floor || "N/A"}
        </p>
      </div>
    </div>
  );
}
