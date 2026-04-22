import './App.css';
import React, {useState} from 'react';
const Laskuri = (props) => { 

    const [luku, setLuku] = useState(0);
// useState on Reactin hook, joka mahdollistaa tilan (state) käytön funktionaalisissa komponenteissa. 
// Tässä tapauksessa luku on tilamuuttuja, joka alustetaan arvoon 0, ja setLuku on funktio, jolla tätä tilaa voidaan päivittää.
  return ( 
    <>
        <h3>{luku}</h3>
        <button onClick={() => setLuku(luku + 1)}>+</button>
        <h3></h3>
        <button onClick={() => setLuku(luku - 1)}>-</button>
        <h3></h3>
        <button onClick={() => { setLuku(0); props.huomio(); }}>Reset</button> 

    </>
  );
}

export default Laskuri; 
