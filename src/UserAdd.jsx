import './App.css';
import React, {useEffect, useState} from 'react';
import UserService from './services/User';
import md5 from 'md5';

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage  }) => {
    
    // Näissä useState-hookeissa määritellään tilamuuttujat, jotka pitävät kirjaa lomakkeelle syötetyistä tiedoista. Jokaisella kentällä on oma tilamuuttuja, joka päivittyy käyttäjän syötteen mukaan.
    const [newFirstname, setNewFirstname] = useState('');
    const [newLastname, setNewLastname] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newAccessLevelId, setNewAccessLevelId] = useState(1);
    const [newConfirmedPassword, setNewConfirmedPassword] = useState('');
    const [error, setError] = useState('');

useEffect(() => {
    if (newPassword && newConfirmedPassword && newPassword !== newConfirmedPassword) {
        setError('Passwords do not match');
    } else {
        setError('');
    }
}, [newPassword, newConfirmedPassword]);

// Kun lomake lähetetään, handleSubmit-funktio luo uuden asiakasolion syötettyjen tietojen perusteella ja kutsuu CustomerService.create-metodia, joka lähettää POST-pyynnön backendille uuden asiakkaan luomiseksi. Onnistuneen lisäyksen jälkeen näytetään alert-viesti ja suljetaan lisäyslomake. Jos lisäys epäonnistuu, näytetään virheilmoitus.
const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== newConfirmedPassword) {
        setError('Passwords do not match');
        return;
    }
    setError('');
    var newUser = {
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccessLevelId),
        username: newUsername,
        password: md5(newPassword)
    }
    console.log(newUser);

    UserService.create(newUser)
    .then(response => {
        if(response.status === 200) {
        setMessage("Käyttäjä " + newUser.username + " lisätty onnistuneesti!");
        setIsPositive(true);
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 3000);

        setLisäystila(false); 
    }

        })
        .catch(error => {
            setMessage("Käyttäjän lisäys epäonnistui: " + error.message);
            setIsPositive(false);
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        })

}
  return ( 
    <div id="userAddWindow">
        <h2>Lisää uusi käyttäjä</h2>
        <form id="registrationForm" onSubmit={handleSubmit} autoComplete="off">
            <div>
            <label>Firstname</label>
            <div>
            <input type="text" value={newFirstname} onChange={({target}) => setNewFirstname(target.value)} placeholder="Firstname" required />
            </div>
            <label>Lastname</label>
            <div>
                <input type="text" value={newLastname} onChange={({target}) => setNewLastname(target.value)} placeholder="Lastname" required />
            </div>
            <label>Email address</label>
            <div>
                <input type="text" value={newEmail} onChange={({target}) => setNewEmail(target.value)} placeholder="Email" required />
            </div>
            <label>Access level ID</label>
            <div>
                 <input type="number" value={newAccessLevelId} onChange={({target}) => setNewAccessLevelId(target.value)} placeholder="Accesslevel ID" required/>
            </div>
            <div>
            <label>Username</label>
            <div>
                 <input type="text" value={newUsername} onChange={({target}) => setNewUsername(target.value)} placeholder="Username" required/>
            </div>
            </div>
            <label htmlFor="password">Password</label>
            <div>
                 <input id="password" name="new-password" type="password" autoComplete="new-password" value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder="Password" required />
            </div>
            <label htmlFor="confirmPassword">Confirm: password</label>
            <div>
                <input id="confirmPassword" name="confirm-new-password" type="password" autoComplete="new-password" value={newConfirmedPassword} onChange={({target}) => setNewConfirmedPassword(target.value)} placeholder="Confirm your password" required />
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input type="submit" id="submitButton" value="Save" />
            <input type="button" value="Back" onClick={() => setLisäystila(false)} />
            </div>
        </form>
    </div>
  );
}
export default UserAdd; 