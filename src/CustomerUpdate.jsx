import './App.css';
import React, {useState} from 'react';
import CustomerService from './services/Customer';

const CustomerUpdate = ({setMuokkausTila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer}) => {
    const [newcustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId);
    const [newcompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName);
    const [newcontactName, setNewContactName] = useState(muokattavaCustomer.contactName);
    const [newcontactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle);

    const [newcountry, setNewCountry] = useState(muokattavaCustomer.country);
    const [newaddress, setNewAddress] = useState(muokattavaCustomer.address);
    const [newcity, setNewCity] = useState(muokattavaCustomer.city);

    const [newpostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode);
    const [newphone, setNewPhone] = useState(muokattavaCustomer.phone);
    const [newfax, setNewFax] = useState(muokattavaCustomer.fax);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleSubmit = (event) => { 
        event.preventDefault();
        var updatedCustomer = {
            customerId: newcustomerId.toUpperCase(),
            companyName: newcompanyName,
            contactName: newcontactName,
            contactTitle: newcontactTitle,
            country: newcountry,
            address: newaddress,
            city: newcity,
            postalCode: newpostalCode,
            phone: newphone,
            fax: newfax,
        }

        CustomerService.update(updatedCustomer)
            .then(response => {
                setIsPositive(true);
                setMessage('Customer updated successfully: ' + updatedCustomer.companyName);
                setShowMessage(true);
                setMuokkausTila(false);
            })
            .catch(error => {
                setIsPositive(false);
                setMessage('Error updating customer');
                setShowMessage(true);
            });
        }
    return (
        <div className="updateForm">
            <h3>Update</h3>
            <form onSubmit={handleSubmit}>
            <div>
            <input type="text" value={newcustomerId} onChange={(e) => setNewCustomerId(e.target.value)} placeholder="Customer ID" disabled={true} />
            </div>
            <div>
            <input type="text" value={newcompanyName} onChange={(e) => setNewCompanyName(e.target.value)} placeholder="Company Name" />
            </div>
            <div>
            <input type="text" value={newcontactName} onChange={(e) => setNewContactName(e.target.value)} placeholder="Contact Name" />
            </div>
             <div>
            <input type="text" value={newcontactTitle} onChange={(e) => setNewContactTitle(e.target.value)} placeholder="Contact Title" />
            </div>
            <div>
            <input type="text" value={newcountry} onChange={(e) => setNewCountry(e.target.value)} placeholder="Country" />
            </div>
            <div>
            <input type="text" value={newaddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="Address" />
            </div>
            <div>
            <input type="text" value={newcity} onChange={(e) => setNewCity(e.target.value)} placeholder="City" />
            </div>
            <div>
            <input type="text" value={newpostalCode} onChange={(e) => setNewPostalCode(e.target.value)} placeholder="Postal Code" />
            </div>
            <div>
            <input type="text" value={newphone} onChange={(e) => setNewPhone(e.target.value)} placeholder="Phone" />
            </div>
            <div>
                <input type="text" value={newfax} onChange={(e) => setNewFax(e.target.value)} placeholder="Fax" />
            </div>
            <div>
                <input type="submit" value="Update" />
                <input type="button" value="Back" onClick={() => setMuokkausTila(false)} />
            </div>
            </form>
        </div>
    )
}
export default CustomerUpdate;