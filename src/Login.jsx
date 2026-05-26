import './App.css';
import React, {useState} from 'react';
import LoginService from './services/Auth';
import md5 from 'md5';
import Axios from 'axios';

const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser}) => {
    
    // Näissä useState-hookeissa määritellään tilamuuttujat, jotka pitävät kirjaa lomakkeelle syötetyistä tiedoista. Jokaisella kentällä on oma tilamuuttuja, joka päivittyy käyttäjän syötteen mukaan.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

// Kun lomake lähetetään, handleSubmit-funktio luo uuden asiakasolion syötettyjen tietojen perusteella ja kutsuu CustomerService.create-metodia, joka lähettää POST-pyynnön backendille uuden asiakkaan luomiseksi. Onnistuneen lisäyksen jälkeen näytetään alert-viesti ja suljetaan lisäyslomake. Jos lisäys epäonnistuu, näytetään virheilmoitus.
const handleSubmit = (event) => {
    event.preventDefault();
    var userForAuth = {
        username: username,
        password: md5(password)
    }

    LoginService.authenticate(userForAuth) 
    .then(response => {
        if (response.status === 200) {

            localStorage.setItem("username", response.data.username)
            localStorage.setItem("accesslevelId", response.data.accesslevelId)
            localStorage.setItem("token", response.data.token)
            Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setLoggedInUser(response.data.username);

        setMessage("Logged in as " + userForAuth.username + " successfully!");
        setIsPositive(true);
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    }
})
        .catch(error => {
            setMessage("Login failed: " + error.message);
            setIsPositive(false);
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        })

    }

const handleEmpty = () => {
    setUsername("");
    setPassword("");
}
  return ( 
    <div id="loginWindow">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                 <input type="text" value={username} onChange={({target}) => setUsername(target.value)} placeholder="Username" required/>
            </div>
            <div>
                 <input type="password" value={password} onChange={({target}) => setPassword(target.value)} placeholder="Password" required />
            </div>
            <input type="submit" value="Login" />
            <input type="button" value="Empty" onClick={handleEmpty} />
        </form>
    </div>
  );
}
export default Login; 