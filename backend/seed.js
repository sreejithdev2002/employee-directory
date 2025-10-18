require("dotenv").config();
const { connect, client } = require("./db");
const { ObjectId } = require("bson");

async function seed() {
  const db = await connect();
  const departments = [
    {
      _id: new ObjectId(),
      name: "Engineering",
      floor: 5,
    },
    {
      _id: new ObjectId(),
      name: "Sales",
      floor: 3,
    },
    {
      _id: new ObjectId(),
      name: 'HR',
      floor: 2,
    },
  ];

  await db.collection("departments").deleteMany({});
  await db.collection("employees").deleteMany({});

  await db.collection("departments").insertMany(departments);

  const employees = [
    {
      name: "Asha Menon",
      position: "Frontend Engineer",
      departmentId: departments[0]._id,
      salary: 60000,
    },
    {
      name: "Ravi Kumar",
      position: "Backend Engineer",
      departmentId: departments[0]._id,
      salary: 65000,
    },
    {
      name: "Priya Nair",
      position: "Sales Executive",
      departmentId: departments[1]._id,
      salary: 45000,
    },
    {
      name: "Suresh Patel",
      position: "HR Manager",
      departmentId: departments[2]._id,
      salary: 55000,
    },
    {
      name: "Anjali Verma",
      position: "Sales Manager",
      departmentId: departments[1]._id,
      salary: 52000,
    },
  ];

  await db.collection("employees").insertMany(employees);

  console.log("Seeded departments and employees");
  await client.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
