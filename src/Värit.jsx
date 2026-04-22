import './App.css';
import React, {useState} from 'react';

const VaihdaVäri = () => {

    const [väri, setVäri] = useState('sininen');

    return (
    <>
    <h3>Väri on {väri}</h3>
    <button onClick={() => setVäri("sininen")}>sininen</button>
    <button onClick={() => setVäri("punainen")}>punainen</button>
    </>
)};

export default VaihdaVäri; 