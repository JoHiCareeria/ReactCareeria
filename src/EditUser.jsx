import './App.css';
import React, {useState} from 'react';
import UserService from './services/User';
import md5 from 'md5';

const EditUser = ({ muokattavaUser, setMuokattavaUser, setMuokkausTila }) => {
    const [newUserId, setNewUserId] = useState(muokattavaUser.userId);
    const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstname);
    const [newLastname, setNewLastname] = useState(muokattavaUser.lastname);
    const [newEmail, setNewEmail] = useState(muokattavaUser.email);
    const [newUsername, setNewUsername] = useState(muokattavaUser.username);
    const [newPassword, setNewPassword] = useState(false);
    const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId);

    const handleSubmit = (event) => {
        event.preventDefault();
        var updatedUser = {
            userId: newUserId,
            firstname: newFirstname,
            lastname: newLastname,
            email: newEmail,
            username: newUsername,
            password: newPassword ? md5(newPassword) : muokattavaUser.password,
            accesslevelId: Number(newAccesslevelId)
        }
        UserService.update(updatedUser)
        .then(() => {
                alert("Käyttäjää " + updatedUser.username + " muokattu onnistunesti!");
                setMuokattavaUser(false);
                setMuokkausTila(false);
        })
        .catch(error => {
            alert("Käyttäjän " + updatedUser.username + " muokkaus epäonnistui: " + error.message);
        });
    }
return (
    <div className="editUser">
        <h2>Edit users informations</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="number" value={newUserId} onChange={({target}) => setNewUserId(target.value)} placeholder="User ID" disabled={true} />
            </div>
            <div>
                <input type="text" value={newFirstname} onChange={({target}) => setNewFirstname(target.value)} placeholder="Firstname" required />
            </div>
            <div>
                <input type="text" value={newLastname} onChange={({target}) => setNewLastname(target.value)} placeholder="Lastname" required />
            </div>
            <div>
                <input type="email" value={newEmail} onChange={({target}) => setNewEmail(target.value)} placeholder="Email" required />
            </div>
            <div>
                <input type="text" value={newUsername} onChange={({target}) => setNewUsername(target.value)} placeholder="Username" required />
            </div>
            <div>
                <input type="password" value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder="Password" required />
            </div>
            <div>
                <input type="number" value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)} placeholder="Accesslevel ID" required />
            </div>
            <div>
                <input type="submit" value="Edit" />
            </div>
            <div>
                <button type="button" value="back" onClick={() => { setMuokattavaUser(false); setMuokkausTila(false); }}>Back</button>
            </div>
        </form>
    </div>
    )
}

export default EditUser;
