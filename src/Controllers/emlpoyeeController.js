const employeeModel = require("../Models/employeModel");
const mongoose = require('mongoose');


function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

const createEmployee = async function (req, res) {
  try {
    // console.log(req.body);
    const data = req.body;
    const createEmployee = await employeeModel.create(data);
    return res.send({
      message: "Employee record added",
      status: "200",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      status: "500",
    });
  }
};

const filterByDepartment = async (req, res) => {
  try {
    // console.log(req.query);
    const { department } = req.query;
    if (!department) {
      return res.send({
        message: "Department parameter is missing",
        status: "400",
      });
    }

    const employees = await employeeModel.find({ department });

    if (!employees || employees.length === 0) {
      return res.send({
        message: "No employees found for the given department",
        status: "404",
      });
    }

    return res.status(200).send({ status: true, data: employees });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      status: "500",
    });
  }
};

const sortEmployeesBySalary = async function (req, res) {
  try {
    const { order } = req.query;
    let sortOrder = 1;

    if (order && order.toLowerCase() === "desc") {
      sortOrder = -1;
    }

    const employees = await employeeModel.find().sort({ salary: sortOrder });

    if (!employees || employees.length === 0) {
      return res.send({
        message: "No Employee found",
        status: "404",
      });
    }

    return res.send({ status: true, data: employees });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      status: "500",
    });
  }
};

const searchEmployeeById = async function (req, res) {
  try {
    const { employee_id } = req.query;
    

    if (!employee_id) {
      return res.send({ status: 400, message: "Enter employee Id" });
    }
    let validId= isValidObjectId(employee_id) 
    if (!validId) {
        return res.send({ status: 400, message: "Enter Valid Id" });
      }

    const employee = await employeeModel.findOne({ _id: employee_id });

    if (!employee) {
      return res.send({ status: 404, message: "Employee Not Found" });
    }
    return res.send({ status: true, data: employee });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      status: "500",
    });
  }
};

module.exports = {
  createEmployee,
  filterByDepartment,
  sortEmployeesBySalary,
  searchEmployeeById,
};
