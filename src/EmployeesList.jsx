import './App.css' 
import React, { useState, useEffect } from 'react' 
import EmployeeService from './services/Employee';
import Employee from './Employee'
import EmployeeAdd from './EmployeeAdd';
import EmployeeEdit from './EmployeeEdit';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([])
    const [showEmployeesList, setShowEmployeesList] = useState(false)
    const [addEmployeeWindow, setAddEmployeeWindow] = useState(false)
    const [editEmployeeWindow, setEditEmployeeWindow] = useState(false)

    useEffect(() => { 
        EmployeeService.getAll()
        .then(data => {
            setEmployees(data);
        })
    }, [addEmployeeWindow, editEmployeeWindow])
    return (
        <>
        <h1 style={{cursor: 'pointer'}} onClick={() => setShowEmployeesList(!showEmployeesList)}>Employees</h1>
        
        <button onClick={() => setAddEmployeeWindow(!addEmployeeWindow)}>Add new employee</button>

        {addEmployeeWindow && <EmployeeAdd addEmployeeWindow={addEmployeeWindow} setAddEmployeeWindow={setAddEmployeeWindow} />}

        {editEmployeeWindow && <EmployeeEdit employeeEditWindow={editEmployeeWindow} setEmployeeEditWindow={setEditEmployeeWindow} />}

        {showEmployeesList && !editEmployeeWindow && employees && employees.map(employee => (
            <div key={employee.employeeId}>
            <Employee employee={employee} editEmployeeWindow={setEditEmployeeWindow} /> 
            </div>
        ))}
        </>
    )
}
export default EmployeesList;