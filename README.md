# 🧑‍💼 Employee Directory - Full Stack Machine Test

A full-stack web application built using **GraphQL**, **Next.js**, **Apollo Client**, and **MongoDB**.  
The system helps manage employee data, including their name, position, department, and salary — with filtering and detailed views.

---

## 🚀 Project Overview

### 🖥️ Frontend
- **Framework:** Next.js (App Router)
- **UI Library:** Tailwind CSS
- **GraphQL Client:** Apollo Client
- **Features:**
  - Home page listing all employees
  - Department filter dropdown
  - Employee details page
  - Add Employee form with validation
  - Loading and error states
  - Responsive design

### ⚙️ Backend
- **Server:** Apollo Server (GraphQL)
- **Database:** MongoDB
- **ORM/Driver:** Native MongoDB Driver
- **Features:**
  - Fetch all employees (summary)
  - Fetch single employee details
  - Filter employees by department
  - Add new employee
  - Fetch department list

---

## 🧩 Folder Structure

employee-directory/  
│  
├── backend/  
│ ├── graphql/  
│ │ ├── resolvers.js  
│ │ └── schema.js  
│ ├── db.js  
│ ├── seed.js  
│ ├── server.js  
│ ├── package.json  
│ └── .env  
│  
├── frontend/  
│ ├── app/  
│ │ ├── page.jsx  
│ │ ├── employee/  
│ │ │ └── [id]/page.jsx  
│ │ └── add/page.jsx  
│ ├── components/  
│ │ ├── ClientWrapper.jsx  
│ │ ├── DepartmentFilter.jsx   
│ ├── package.json  
│ └── .env  
│  
└── README.md  

---

## ⚙️ Backend Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Environment variables (backend/.env)
```bash
MONGO_URI=mongodb://localhost:27017/employee_directory  # or MongoDB Atlas connection string
PORT=4000
NEXTJS_FRONTEND_URL=http://localhost:3000
```

### 3. Seed the database (if you have seed.js)
```bash
node seed.js
```

### 4. Start server
```bash
npm start
```
GraphQL endpoint: http://localhost:4000/graphql (or the URL printed by your server)

---
## 🖥 Frontend — Local Setup
### 1. Install & run
```bash
cd frontend
npm install
```
### 2. Environment (frontend/.env)
```bash
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql
```
### 3. Start frontend
```bash
npm run dev
```
Open: http://localhost:3000

---
## 🧾 GraphQL Schema (overview)
### Types
```bash
type Department {
  id: ID!
  name: String!
  floor: Int
}

type Employee {
  id: ID!
  name: String!
  position: String!
  salary: Float!
  department: Department
}
```
### Queries
- getAllEmployees: returns list of employees (with department)

- getEmployeeDetails(id: ID!): returns full employee object

- getDepartments: returns departments

- getEmployeesByDepartment(department: ID!): returns employees in a department

### Mutation
- addEmployee(name, position, department, salary): Employee!
