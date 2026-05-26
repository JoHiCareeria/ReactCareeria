import App from './App.css'
import React, {useState, useEffect} from 'react'
import EmployeeServices from './services/Employee'
import EmployeesList from './EmployeesList'
import EmployeeAdd from './EmployeeAdd'

const Employee = ({employee, editEmployeeWindow}) => {

    const deleteEmployee = (employee) => {
        let vastaus = window.confirm("Haluatko varmasti poistaa työntekijän " + employee.firstName + " ?");
        if (vastaus === true) {
            EmployeeServices.remove(employee.employeeId)
            .then(res => {
                if (res.status === 200) {
                    alert("Työntekijä " + employee.firstName + " on poistettu onnistuneesti!")
                    window.location.reload();
                }
            })
            .catch(error => {
                alert("Työntekijän poistaminen epäonnistui: " + error.message);
            })
        }
    }


return (
    <table className="employeeTable">
        <thead>
            <tr>
                <th>Edit</th>
                <th>Delete</th>
                <th>Employee ID</th>
                <th>Lastname</th>
                <th>Firstname</th>
                <th>Title</th>
                <th>Title of courtesy</th>
                <th>Birthdate</th>
                <th>Hiredate</th>
                <th>Address</th>
                <th>City</th>
                <th>Region</th>
                <th>Postal code</th>
                <th>Homephone</th>
                <th>Extension</th>
                <th>Notes</th>
                <th>Reports to</th>
                <th>PhotoPath</th>
            </tr>
        </thead>
        <tbody>
            <td><button className="editButton" onClick={() => editEmployeeWindow(employee)}>Edit</button></td>
            <td><button className="deleteButton" onClick={() => deleteEmployee(employee)}>Delete</button></td>
            <td>{employee.employeeId}</td>
            <td><strong>{employee.lastName}</strong></td>
            <td>{employee.firstName}</td>
            <td>{employee.title}</td>
            <td>{employee.titleOfCourtesy}</td>
            <td>{employee.birthDate}</td>
            <td>{employee.hireDate}</td>
            <td>{employee.address}</td>
            <td>{employee.city}</td>
            <td>{employee.region}</td>
            <td>{employee.postalCode}</td>
            <td>{employee.homePhone}</td>
            <td>{employee.extension}</td>
            <td className="longText">{employee.notes}</td>
            <td>{employee.reportsTo}</td>
            <td>{employee.photoPath}</td>
        </tbody>
    </table>
    )
}

export default Employee;