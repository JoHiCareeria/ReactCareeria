import './App.css';
import React, {useState, useEffect} from 'react';
import UserService from './services/User';
import UserAdd from './UserAdd';
import UserUpdate from './EditUser';

const UserList = ({setIsPositive, setMessage, setShowMessage }) => { 

    const [users, setUsers] = useState([]);
    const [lisäysTila, setLisäystila] = useState(false);
    const [muokkausTila, setMuokkausTila] = useState(false);
    const [muokattavaUser, setMuokattavaUser] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
      UserService.getAll()
      .then(data => { 
        setUsers(data);
      });
    }, [lisäysTila, muokkausTila, muokattavaUser]); // Tämä useEffect-hook hakee käyttäjätiedot backendiltä, kun komponentti renderöidään ensimmäisen kerran, ja uudestaan aina, kun lisäysTila tai reload muuttuu. Näin varmistetaan, että käyttäjälista päivittyy automaattisesti, kun uusi käyttäjä on lisätty tai olemassa oleva käyttäjä on päivitetty.

    const handleSearchChange = (event) => {
      setSearch(event.target.value.toLowerCase());
    }

    const editUser = (user) => { 
      setMuokattavaUser(user);
      setMuokkausTila(true);

    }

    const poistaUser = (user) => {
      let vastaus = window.confirm("Poistetaanko käyttäjä " + user.username + "?");

      if (vastaus === true) {
        UserService.remove(user.userId)
        .then(res => {
          if (res.status === 200) {
            alert("Käyttäjä " + user.username + " on poistettu onnistuneesti!");
            window.location.reload();
          }
        })
        .catch(error => {
          alert("Käyttäjän poistaminen epäonnistui: " + error.message);
        })
      }
    }

  return (  
    <>

      <h1><nobr>Users</nobr>
              {lisäysTila && <UserAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

              {!lisäysTila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>
              
              {muokattavaUser && <UserUpdate muokattavaUser={muokattavaUser} setMuokattavaUser={setMuokattavaUser} setMuokkausTila={setMuokkausTila} />}

              {!lisäysTila && !muokkausTila && <input placeholder="Search by Lastname" value={search} onChange={handleSearchChange}></input>}

        {!lisäysTila && !muokkausTila &&
        <table className="userTable">
            <thead>
                <th>Edit</th>
                <th>Delete</th>
                <th>User ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Username</th>
                <th>Password</th>
                <th>Accesslevel</th>
            </thead>
            <tbody>


      {users && users.map(u => 
      {
            const lowerCaseName = u.lastname.toLowerCase();
            if (lowerCaseName.indexOf(search) > -1) {
                return (
                    <tr key={u.userId}>
                      <td><button className="editButton" onClick={() => editUser(u)}>Edit</button></td>
                      <td><button className="deleteButton" onClick={() => poistaUser(u)}>Delete</button></td>
                        <td>{u.userId}</td>
                        <td>{u.firstname}</td>
                        <td>{u.lastname}</td>
                        <td>{u.email}</td>
                        <td>{u.username}</td>
                        <td>{u.password}</td>
                        <td>{u.accesslevelId}</td>
                    </tr>
        )
            }
      }
      )
      }
            </tbody>
        </table>
}
  </>
)}
        /*showUsers && users && users.map(u => (
          <div key={u.userId}>
            <User user={u} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} reloadNow={reloadNow} reload={reload} setMuokattavaUser={editUser}
            />
          </div>
        ))

      }
    </>
)}*/

              /*{lisäysTila && <UserAdd setLisäystila={setLisäystila} 
              setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

              {muokkausTila && <UserUpdate setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive}
              setMessage={setMessage} setShowMessage={setShowMessage} muokattavaUser={muokattavaUser} /> }*/

export default UserList; 
