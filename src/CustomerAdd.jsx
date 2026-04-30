import './App.css';
import React, {useState} from 'react';
import CustomerService from './services/Customer';

const CustomerAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage }) => { 
    
    // Näissä useState-hookeissa määritellään tilamuuttujat, jotka pitävät kirjaa lomakkeelle syötetyistä tiedoista. Jokaisella kentällä on oma tilamuuttuja, joka päivittyy käyttäjän syötteen mukaan.
    const [newCustomerId, setNewCustomerId] = useState(''); 
    const [newCompanyName, setNewCompanyName] = useState('');
    const [newContactName, setNewContactName] = useState('');
    const [newContactTitle, setNewContactTitle] = useState('');

    const [newCountry, setNewCountry] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newCity, setNewCity] = useState('');

    const [newPostalCode, setNewPostalCode] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newFax, setNewFax] = useState('');

// Kun lomake lähetetään, handleSubmit-funktio luo uuden asiakasolion syötettyjen tietojen perusteella ja kutsuu CustomerService.create-metodia, joka lähettää POST-pyynnön backendille uuden asiakkaan luomiseksi. Onnistuneen lisäyksen jälkeen näytetään alert-viesti ja suljetaan lisäyslomake. Jos lisäys epäonnistuu, näytetään virheilmoitus.
const handleSubmit = (event) => {
    event.preventDefault();
    var newCustomer = {
        customerId: newCustomerId.toUpperCase(),
        companyName: newCompanyName,
        contactName: newContactName,
        contactTitle: newContactTitle,
        address: newAddress,
        city: newCity,
        postalCode: newPostalCode,
        country: newCountry,
        phone: newPhone,
        fax: newFax
    }
    CustomerService.create(newCustomer)
    .then(response => {
        if(response.status === 200) {
        setMessage("Asiakas " + newCustomer.companyName + " lisätty onnistuneesti!");
        setIsPositive(true);
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 3000);

        setLisäystila(false); 
    }

        })
        .catch(error => {
            setMessage("Asiakkaan lisäys epäonnistui: " + error.message);
            setIsPositive(false);
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        })

}
  return ( 
    <div id="addNew">
        <h2>Lisäys komponentti</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <input type="text" value={newCustomerId} onChange={({target}) => setNewCustomerId(target.value.toUpperCase())} maxLength={5} placeholder="Customer ID" required />
            </div>
            <div>
                <input type="text" value={newCompanyName} onChange={({target}) => setNewCompanyName(target.value)} placeholder="Company name" required />
            </div>
            <div>
                <input type="text" value={newContactName} onChange={({target}) => setNewContactName(target.value)} placeholder="Contact name" required />
            </div>
            <div>
                 <input type="text" value={newContactTitle} onChange={({target}) => setNewContactTitle(target.value)} placeholder="Contact title" required/>
            </div>
            <div>
                 <input type="text" value={newAddress} onChange={({target}) => setNewAddress(target.value)} placeholder="Address" required />
            </div>
            <div>
                 <input type="text" value={newCity} onChange={({target}) => setNewCity(target.value)} placeholder="City" required />
            </div>
            <div>
                <input type="text" value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)} placeholder="Postal code" required />
            </div>
            <div>
                <input type="text" value={newCountry} onChange={({target}) => setNewCountry(target.value)} placeholder="Country" required />
            </div>
            <div>
                <input type="text" value={newPhone} onChange={({target}) => setNewPhone(target.value)} placeholder="Phone" required />
            </div>
            <div>
                <input type="text" value={newFax} onChange={({target}) => setNewFax(target.value)} placeholder="Fax" required />
            </div>
            <input type="submit" value="Save" />
            <input type="button" value="Back" onClick={() => setLisäystila(false)} />
        </form>
    </div>
  );
}

export default CustomerAdd; 
