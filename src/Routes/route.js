const express= require('express');
const router = express.Router();
const emlpoyeeController = require('../Controllers/emlpoyeeController');

router.post('/createEmployee',emlpoyeeController.createEmployee)
router.post('/getByDepartment',emlpoyeeController.filterByDepartment)
router.post('/sortBySalary',emlpoyeeController.sortEmployeesBySalary)
router.post('/searchEmployeeById',emlpoyeeController.searchEmployeeById)

module.exports=router;