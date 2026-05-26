import React , {useState, useEffect} from 'react';
import './App.css'; 
import Laskuri from './Laskuri';
import Viesti from './Viesti';
import Väri from './Värit';
import Posts from './Posts';
import Todos from './Todos';
import CustomerList from './CustomerList';
import ProductsList from './ProductsList';
import EmployeesList from './EmployeesList';
import Message from './Message';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './UserList';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'; // React Routerin komponentit reittien määrittelyyn ja navigointiin

import Axios from "axios";
const token = localStorage.getItem("token");
if (token && token !== "undefined" && token !== "null") {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  delete Axios.defaults.headers.common['Authorization'];
}

const App = () => { 

const [showLaskuri, setShowLaskuri] = useState(false);
const [showPosts, setShowPosts] = useState(false);
const [message, setMessage] = useState('');
const [showMessage, setShowMessage] = useState(false);
const [isPositive, setIsPositive] = useState(false);
const [showCustomerList, setShowCustomerList] = useState(true);
const [loggedInUser, setLoggedInUser] = useState('');
const [accessLevelId, setaccessLevelId] = useState(0);

useEffect(() => {
  let storedUser = localStorage.getItem("username");
  if (storedUser !== null) {
    setLoggedInUser(storedUser);
  }
}, []);

const huomio = () => {
  alert("Huomio! Laskuri resetoitu!");
} 

const logOut = () => {
  localStorage.clear();
  delete Axios.defaults.headers.common['Authorization'];
  setLoggedInUser('');
}



  return ( 
    <div className="App">
{!loggedInUser && <Login setLoggedInUser={setLoggedInUser} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}  />}

{ loggedInUser && 
    <Router>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Link to={'/Customers'} className='nav-link'>Customers</Link>
          <Link to={'/Employees'} className='nav-link'>Employees</Link>
          <Link to={'/Laskuri'} className='nav-link' onClick={huomio}>Laskuri</Link>
          <Link to={'/Todos'} className='nav-link'>Typicode Todos</Link>
          <Link to={'/Posts'} className='nav-link'>Typicode Posts</Link>
          <Link to={'/Product'} className='nav-link'>Products</Link>
          <Link to={'/UserList'} className='nav-link'>Users</Link>
          <button onClick={logOut}>Logout</button>
        </Nav>
      </Navbar>

      <h2>Northwind Traders</h2>
      {showMessage && <Message message={message} isPositive={isPositive} />}

      <Routes>
        <Route path='/Customers' element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} />} />
        <Route path='/Employees' element={<EmployeesList />} />
        <Route path='/Laskuri' element={<Laskuri huomio={huomio} />} />
        <Route path='/Posts' element={<Posts />} />
        <Route path='/Todos' element={<Todos />} />
        <Route path='/Product' element={<ProductsList />} />
        <Route path='/UserList' element={<UserList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} />} />
      </Routes>
    </Router>

    }
    </div>
  );
}
    export default App; 