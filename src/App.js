import React , {useState} from 'react';
import './App.css'; 
import Laskuri from './Laskuri';
import Viesti from './Viesti';
import Väri from './Värit';
import Posts from './Posts';
import CustomerList from './CustomerList';


const App = () => { 

const [showLaskuri, setShowLaskuri] = useState(false);
const [showPosts, setShowPosts] = useState(false);

const huomio = () => {
  alert("Huomio! Laskuri resetoitu!");
}

  return ( 
    <div className="App">
      <h1>Hello from React!</h1>
      {showPosts && <button onClick={() => setShowPosts(false)}>Piilota postaukset</button>}
      {!showPosts && <button onClick={() => setShowPosts(true)}>Näytä postaukset</button>}
      {showPosts && <Posts />}
      {showLaskuri && <Laskuri huomio={huomio}/>}
      {showLaskuri === true? <Laskuri /> : null}
      {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota laskuri</button>}
      {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä laskuri</button>}
      <CustomerList />
      
      <Viesti teksti="tässä on viesti"/>
      <Viesti teksti="tässä on toinen viesti"/>
      <Väri teksti="sininen"/>
      <Väri teksti="oranssi"/>
    </div>
  );
}

export default App; 
