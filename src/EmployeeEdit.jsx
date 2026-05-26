import App from './App.css'
import React, {useRef, useState} from 'react'
import EmployeeServices from './services/Employee'

const EmployeeEdit = ({employeeEditWindow, setEmployeeEditWindow, setShowEmployeesList, showEmployeesList}) => {
    const [editEmployeeId, setEditEmployeeId] = useState(employeeEditWindow.employeeId);
    const [editFirstName, setEditFirstName] = useState(employeeEditWindow.firstName);
    const [editLastName, setEditLastName] = useState(employeeEditWindow.lastName);
    const [editTitle, setEditTitle] = useState(employeeEditWindow.title);
    const [editTitleOfCourtesy, setEditTitleOfCourtesy] = useState(employeeEditWindow.titleOfCourtesy);
    const [editBirthDate, setEditBirthDate] = useState(employeeEditWindow.birthDate);
    const [editHireDate, setEditHireDate]= useState(employeeEditWindow.hireDate);
    const [editAddress, setEditAddress] = useState(employeeEditWindow.address);
    const [editCity, setEditCity] = useState(employeeEditWindow.city);
    const [editRegion, setEditRegion] = useState(employeeEditWindow.region);
    const [editPostalCode, setEditPostalCode] = useState(employeeEditWindow.postalCode);
    const [editHomePhone, setEditHomePhone] = useState(employeeEditWindow.homePhone);
    const [editExtension, setEditExtension] = useState(employeeEditWindow.extension);
    const [editNotes, setEditNotes] = useState(employeeEditWindow.notes);
    const [editReportsTo, setEditReportsTo] = useState(employeeEditWindow.reportsTo);
    const [editPhotoPath, setEditPhotoPath] = useState(employeeEditWindow.photoPath);

    const handleSubmit = (event) => {
        event.preventDefault();
        var editedEmployee = {
            EmployeeId: Number(editEmployeeId),
            Firstname: editFirstName,
            Lastname: editLastName,
            Title: editTitle,
            TitleOfCourtesy: editTitleOfCourtesy,
            BirthDate: new Date(editBirthDate),
            HireDate: new Date(editHireDate),
            Address: editAddress,
            City: editCity,
            Region: editRegion,
            PostalCode: Number(editPostalCode),
            HomePhone: Number(editHomePhone),
            Extension: Number(editExtension),
            Notes: editNotes,
            ReportsTo: Number(editReportsTo),
            PhotoPath: editPhotoPath
        }
        EmployeeServices.edit(editedEmployee)
        .then(response => {
            if (response.status === 200) {
                alert("Employee " + editedEmployee.Firstname + " updated succesfully!");
                setEmployeeEditWindow(false);
            }
        })
        .catch(err => {
            alert("Failed to update employee: " + editedEmployee.Firstname + " " + (err.response?.data || err.message));
        })
    }

    return (
        <div id="editEmployee">
            <h2>Edit employees details</h2>
            <form onSubmit={handleSubmit}>
            <div>
            <label>Employee ID : </label>
            <input type="text" value={editEmployeeId} onChange={(e) => setEditEmployeeId(e.target.value)} placeholder="Employee ID" disabled={true} />
            </div>
            <div>
            <label>First Name : </label>
            <input type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} placeholder="First Name" />
            </div>
            <div>
            <label>Last Name : </label>
            <input type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} placeholder="Last Name" />
            </div>
             <div>
            <label>Title : </label>
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" />
            </div>
            <div>
            <label>Title Of Courtesy : </label>
            <input type="text" value={editTitleOfCourtesy} onChange={(e) => setEditTitleOfCourtesy(e.target.value)} placeholder="Title Of Courtesy" />
            </div>
            <div>
            <label>Birth Date : </label>
            <input type="date" value={editBirthDate} onChange={(e) => setEditBirthDate(e.target.value)} placeholder="Birth Date" />
            </div>
            <div>
            <label>Hire Date : </label>
            <input type="date" value={editHireDate} onChange={(e) => setEditHireDate(e.target.value)} placeholder="Hire Date" />
            </div>
            <div>
            <label>Address : </label>
            <input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} placeholder="Address" />
            </div>
            <div>
            <label>City : </label>
            <input type="text" value={editCity} onChange={(e) => setEditCity(e.target.value)} placeholder="City" />
            </div>
            <div>
            <label>Region : </label>
            <input type="text" value={editRegion} onChange={(e) => setEditRegion(e.target.value)} placeholder="Region" />
            </div>
            <div>
            <label>Postal Code : </label>
            <input type="number" value={editPostalCode} onChange={(e) => setEditPostalCode(e.target.value)} placeholder="Postal Code" />
            </div>
            <div>
            <label>Home Phone : </label>
            <input type="number" value={editHomePhone} onChange={(e) => setEditHomePhone(e.target.value)} placeholder="Home Phone" />
            </div>
            <div>
            <label>Extension : </label>
            <input type="number" value={editExtension} onChange={(e) => setEditExtension(e.target.value)} placeholder="Extension" />
            </div>
            <div>
            <label>Notes : </label>
            <input type="text" value={editNotes} onChange={(e) => setEditNotes(e.target.value)} placeholder="Notes" />
            </div>
            <div>
            <label>Reports To : </label>
            <input type="number" value={editReportsTo} onChange={(e) => setEditReportsTo(e.target.value)} placeholder="Reports To" />
            </div>
            <div>
            <label>Photo Path : </label>
            <input type="text" value={editPhotoPath} onChange={(e) => setEditPhotoPath(e.target.value)} placeholder="Photo Path" />
            </div>
            <div>
                <input type="submit" value="Edit" />
                <input type="button" value="Back" onClick={() => setEmployeeEditWindow(false)} />
            </div>
            </form>
        </div>
    )
}

export default EmployeeEdit;