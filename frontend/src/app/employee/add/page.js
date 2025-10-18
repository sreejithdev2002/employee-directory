"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";

const GET_DEPARTMENTS = gql`
  query {
    getDepartments {
      id
      name
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation addEmployee(
    $name: String!
    $position: String!
    $salary: Float!
    $departmentId: ID!
  ) {
    addEmployee(
      name: $name
      position: $position
      salary: $salary
      department: $departmentId
    ) {
      id
      name
    }
  }
`;

export default function AddEmployee() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const { data: deptData } = useQuery(GET_DEPARTMENTS);

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => router.push("/"),
  });

  const onSubmit = (formData) => {
    addEmployee({
      variables: {
        name: formData.name,
        position: formData.position,
        salary: parseFloat(formData.salary),
        departmentId: formData.department,
      },
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg border border-gray-200">
      <button
        className="mb-6 text-blue-600 hover:underline"
        onClick={() => router.push("/")}
      >
        &larr; Back
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Employee</h1>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Position */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Position</label>
          <input
            {...register("position", { required: "Position is required" })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.position && <p className="text-red-500 mt-1">{errors.position.message}</p>}
        </div>

        {/* Salary */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Salary</label>
          <input
            type="number"
            {...register("salary", { 
              required: "Salary is required", 
              min: { value: 0, message: "Salary must be positive" } 
            })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.salary && <p className="text-red-500 mt-1">{errors.salary.message}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Department</label>
          <select
            {...register("department", { required: "Please select a department" })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Department</option>
            {deptData?.getDepartments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.department && <p className="text-red-500 mt-1">{errors.department.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}
