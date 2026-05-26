import App from './App.css'
import React, {useState, useEffect} from 'react'
import EmployeeServices from './services/Employee'
import EmployeesList from './EmployeesList'

const EmployeeAdd = ({addEmployeeWindow, setAddEmployeeWindow}) => {
    const [newLastName, setNewLastName] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newTitleOfCourtesy, setNewTitleOfCourtesy] = useState('');
    const [newBirthDate, setNewBirthDate] = useState('');
    const [newHireDate, setNewHireDate]= useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newRegion, setNewRegion] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');
    const [newHomePhone, setNewHomePhone] = useState('');
    const [newExtension, setNewExtension] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [newReportsTo, setNewReportsTo] = useState('');
    const [newPhotoPath, setNewPhotoPath] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        var newEmployee = {
            Lastname: newLastName,
            Firstname: newFirstName,
            Title: newTitle,
            TitleOfCourtesy: newTitleOfCourtesy,
            BirthDate: newBirthDate,
            HireDate: newHireDate,
            Address: newAddress,
            City: newCity,
            Region: newRegion,
            PostalCode: newPostalCode,
            HomePhone: newHomePhone,
            Extension: newExtension,
            Notes: newNotes,
            ReportsTo: Number(newReportsTo),
            PhotoPath: newPhotoPath
        }
        EmployeeServices.create(newEmployee)
        .then(response => {
            if (response.status === 200) { 
                alert("Employee " + newEmployee.Firstname + " " + newEmployee.Lastname + " added successfully!");
                setAddEmployeeWindow(false);
            }
        })
        .catch(err => {
            alert("Failed to add employee: " + newEmployee.Firstname + " " + (err.response?.data || err.message));
        })
    }


    return (
        <div id="addNewEmployee">
            <h2>Add new employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Lastname</label>
                    <input type="text" value={newLastName} onChange={({target}) => setNewLastName(target.value)} placeholder="Lastname" required />
                </div>
                <div>
                    <label>Firstname</label>
                    <input type="text" value={newFirstName} onChange={({target}) => setNewFirstName(target.value)} placeholder="Firstname" required />
                </div>
                <div>
                    <label>Title</label>
                    <input type="text" value={newTitle} onChange={({target}) => setNewTitle(target.value)} placeholder="Title" required />
                </div>
                <div>
                    <label>Title of Courtesy</label>
                    <input type="text" value={newTitleOfCourtesy} onChange={({target}) => setNewTitleOfCourtesy(target.value)} placeholder="Title Of Courtesy" required />                
                </div>
                <div>
                    <label>Birthdate</label>
                    <input type="date" value={newBirthDate} onChange={({target}) => setNewBirthDate(target.value)} required />
                </div>
                <div>
                    <label>Hire date</label>
                    <input type="date" value={newHireDate} onChange={({target}) => setNewHireDate(target.value)} required />
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" value={newAddress} onChange={({target}) => setNewAddress(target.value)} placeholder="Address" required />
                </div>
                <div>
                    <label>City</label>
                    <input type="text" value={newCity} onChange={({target}) => setNewCity(target.value)} placeholder="City" required />
                </div>
                <div>
                    <label>Region</label>
                    <input type="text" value={newRegion} onChange={({target}) => setNewRegion(target.value)} placeholder="Region" required />
                </div>
                <div>
                    <label>Postal code</label>
                    <input type="text" value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)} placeholder="Postal code" required />
                </div>
                <div>
                    <label>Home phone</label>
                    <input type="text" value={newHomePhone} onChange={({target}) => setNewHomePhone(target.value)} placeholder="Home phone" required />
                </div>
                <div>
                    <label>Extension</label>
                    <input type="text" value={newExtension} onChange={({target}) => setNewExtension(target.value)} placeholder="Extension" required />
                </div>
                <div>
                    <label>Notes</label>
                    <input type="text" value={newNotes} onChange={({target}) => setNewNotes(target.value)} placeholder="Notes" required />
                </div>
                <div>
                    <label>Reports to</label>
                    <input type="number" value={newReportsTo} onChange={({target}) => setNewReportsTo(Number(target.value))} placeholder="Reports to" required />
                </div>
                <div>
                    <label>Photo path</label>
                    <input type="text" value={newPhotoPath} onChange={({target}) => setNewPhotoPath(target.value)} placeholder="Photo path" required />
                </div>
                <input type="submit" className="saveButton" value="Add employee" />
                <input type="button" className="backButton" value="Back" onClick={() => setAddEmployeeWindow(false)} />
            </form>
        </div>
    )
}
export default EmployeeAdd;