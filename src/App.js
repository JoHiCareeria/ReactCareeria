import React , {useState} from 'react';
import './App.css'; 
import Laskuri from './Laskuri';
import Viesti from './Viesti';
import Väri from './Värit';


const App = () => { 

const [showLaskuri, setShowLaskuri] = useState(false);

const huomio = () => {
  alert("Huomio! Laskuri resetoitu!");
}

  return ( 
    <div className="App">
      <h1>Hello from React!</h1>

      {showLaskuri && <Laskuri huomio={huomio}/>}
      {showLaskuri === true? <Laskuri /> : null}
      {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota laskuri</button>}
      {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä laskuri</button>}
      
      <Viesti teksti="tässä on viesti"/>
      <Viesti teksti="tässä on toinen viesti"/>
      <Väri teksti="sininen"/>
      <Väri teksti="oranssi"/>
    </div>
  );
}

export default App; 
