import './App.css';
import React, {useState, useEffect} from 'react';
import CustomerService from './services/Customer';
import Customer from './Customer';
import CustomerAdd from './CustomerAdd';
import CustomerUpdate from './CustomerUpdate';

const CustomerList = ({ setIsPositive, setMessage, setShowMessage }) => { 

    const [customers, setCustomers] = useState([]);
    const [showCustomers, setShowCustomers] = useState(false);
    const [lisäysTila, setLisäystila] = useState(false);
    const [muokkausTila, setMuokkausTila] = useState(null);
    const [reload, reloadNow] =useState(false);
    const [muokattavaCustomer, setMuokattavaCustomer] = useState(null);

    useEffect(() => {
      CustomerService.getAll()
      .then(data => { 
        setCustomers(data);
      });
    }, [lisäysTila, reload, muokkausTila]); // Tämä useEffect-hook hakee asiakastiedot backendiltä, kun komponentti renderöidään ensimmäisen kerran, ja uudestaan aina, kun lisäysTila tai reload muuttuu. Näin varmistetaan, että asiakaslista päivittyy automaattisesti, kun uusi asiakas on lisätty tai olemassa oleva asiakas on päivitetty.

    const avaaMuokkaus = (customer) => { 
      setMuokattavaCustomer(customer);
      setMuokkausTila(true);
    }

  return ( 
    <>

      <h1><nobr style={{cursor: 'pointer'}}
              onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>
              
              {!lisäysTila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

              {lisäysTila && <CustomerAdd setLisäystila={setLisäystila} 
              setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

              {muokkausTila && ( <CustomerUpdate setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive}
              setMessage={setMessage} setShowMessage={setShowMessage} muokattavaCustomer={muokattavaCustomer} /> )}

      {
        showCustomers && customers && customers.map(c => (
          <div key={c.customerId}>
            <Customer customer={c} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} reloadNow={reloadNow} reload={reload} setMuokattavaCustomer={avaaMuokkaus}
            />
          </div>
        ))

      }
    </>
)}

export default CustomerList; 
