const { ObjectId } = require("bson");

function toEmployeeSummary(doc) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    position: doc.position,
  };
}

function departmentToObj(dept) {
  return {
    id: dept._id.toString(),
    name: dept.name,
    floor: dept.floor,
  };
}

const resolvers = {
  Query: {
    getAllEmployees: async (_, __, { db }) => {
      const employees = await db.collection("employees").find({}).toArray();

      // Populate department info for each employee
      return Promise.all(
        employees.map(async (emp) => {
          const dept = await db
            .collection("departments")
            .findOne({ _id: new ObjectId(emp.departmentId) });

          return {
            id: emp._id.toString(),
            name: emp.name,
            position: emp.position,
            salary: emp.salary,
            department: dept ? departmentToObj(dept) : null,
          };
        })
      );
    },

    getEmployeeDetails: async (_, { id }, { db }) => {
      if (!ObjectId.isValid(id)) throw new Error("Invalid employee ID");

      const emp = await db
        .collection("employees")
        .findOne({ _id: new ObjectId(id) });
      if (!emp) throw new Error("Employee not found");

      // Fetch the department object separately
      const department = await db
        .collection("departments")
        .findOne({ _id: new ObjectId(emp.departmentId) });

      // Return employee with department object
      return {
        ...emp,
        id: emp._id.toString(),
        department: department
          ? {
              id: department._id.toString(),
              name: department.name,
              floor: department.floor,
            }
          : null,
      };
    },
    getEmployeesByDepartment: async (_, { department }, { db }) => {
      if (!ObjectId.isValid(department)) {
        throw new Error("Invalid department id");
      }
      const employees = await db
        .collection("employees")
        .find({ departmentId: new ObjectId(department) })
        .toArray();
      return employees.map(toEmployeeSummary);
    },
    getDepartments: async (_, __, { db }) => {
      const depts = await db.collection("departments").find({}).toArray();
      return depts.map(departmentToObj);
    },
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }, { db }) => {
      if (!name || !position || !department || !salary == null) {
        throw new Error("Missing fileds");
      }
      if (!ObjectId.isValid(department))
        throw new Error("Invalid department Id");

      const dept = await db
        .collection("departments")
        .findOne({ _id: new ObjectId(department) });
      if (!dept) throw new Error("Department not found");

      const res = await db.collection("employees").insertOne({
        name,
        position,
        departmentId: new ObjectId(department),
        salary: Number(salary),
      });

      const emp = await db
        .collection("employees")
        .findOne({ _id: res.insertedId });
      return {
        id: emp._id.toString(),
        name: emp.name,
        position: emp.position,
        salary: emp.salary,
        department: departmentToObj(dept),
      };
    },
  },
};

module.exports = resolvers;
