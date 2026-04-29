import './App.css';
import React, {useState, useEffect} from 'react';
import CustomerService from './services/Customer';
import Customer from './Customer';
import CustomerAdd from './CustomerAdd';

const CustomerList = () => { 

    const [customers, setCustomers] = useState([]);
    const [showCustomers, setShowCustomers] = useState(false);
    const [lisäysTila, setLisäystila] = useState(false);

    useEffect(() => {
      CustomerService.getAll()
      .then(data => { 
        setCustomers(data);
      });
    }, [lisäysTila]); // Tämä useEffect-hook hakee asiakastiedot backendiltä, kun komponentti renderöidään ensimmäisen kerran, ja uudestaan aina, kun lisäysTila muuttuu. Näin varmistetaan, että asiakaslista päivittyy automaattisesti, kun uusi asiakas on lisätty.


  return ( 
    <>

      <h1><nobr style={{cursor: 'pointer'}}
              onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>
              
              {!lisäysTila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

              {lisäysTila && <CustomerAdd setLisäystila={setLisäystila}/>}
      {
        showCustomers && customers && customers.map(c => (
          <Customer key={c.customerId} customer={c} />
        ))

      }
    </>
  );
}

export default CustomerList; 
