import './App.css'
import React, {useState} from 'react';
import CustomerService from './services/Customer';

const Customer = ({customer, setIsPositive, setMessage, setShowMessage, reload, reloadNow, muokattavaCustomer, setMuokattavaCustomer}) => { 

    const [showDetails, setShowDetails] = useState(false);

    const deleteCustomer = (customer) => {
        let vastaus = window.confirm("poistetaanko asiakas " + customer.companyName + "?"); 
        
        if(vastaus === true) {
        CustomerService.remove(customer.customerId)
        .then(res => {
            if (res.status === 200) {
                setMessage("Asiakas " + customer.companyName + " on poistettu onnistuneesti!");
                setIsPositive(true);
                setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false)},
                2000
            )
            reloadNow(!reload); // Tämä reloadNow-kutsu on tärkeä, koska se pakottaa CustomerList-komponentin uudelleenrenderöitymään ja hakemaan päivitetyn asiakaslistan backendiltä. Ilman tätä, asiakaslista ei päivity automaattisesti, kun asiakas on poistettu, ja käyttäjä saattaa nähdä vanhentuneet tiedot.
            }   
                }
        )
        .catch(error => {
            setMessage("Asiakkaan poistaminen epäonnistui: " + error.message);
            setIsPositive(false);
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 6000);
        });
    }
    else {
        setMessage("Asiakkaan poisto peruttu.");
        setIsPositive(true);
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 6000
    );
    }
}
  return ( 
    <div className="custDiv">
        <h4 onClick={() => setShowDetails(!showDetails)}>{customer.companyName.toUpperCase()}</h4>
        
        {showDetails && <div className="customerDetails">
            <h5 className="companyDetails">{customer.companyName.toUpperCase()} Details</h5>
            <button onClick={() => deleteCustomer(customer)}>Delete</button>
            <button onClick={() => setMuokattavaCustomer(customer)}>Edit</button>
            <table>
                <thead>
                    <tr>
                        <th>Contact person</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer.contactName}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.country}</td>
                    </tr>
                </tbody>
            </table></div>}
            </div>
  )
}
export default Customer;