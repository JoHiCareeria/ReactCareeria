import Axios from "axios"; // Axios-kirjasto on tuotu tähän tiedostoon, jotta voimme käyttää sitä HTTP-pyyntöjen tekemiseen API:iin. Axios tarjoaa helpon tavan tehdä GET-, POST-, PUT- ja DELETE-pyyntöjä, ja se käsittelee automaattisesti JSON-datan muuntamisen ja virheiden hallinnan.

const  baseUrl = 'http://localhost:5222/api/products'; // baseUrl-muuttuja määrittelee API:n perusosoitteen, johon tehdään HTTP-pyynnöt. Tässä tapauksessa se osoittaa paikalliseen palvelimeen, joka tarjoaa tuotteiden tietoja. Tämä URL on tärkeä, koska kaikki API-kutsut tehdään tämän osoitteen kautta.

const getAll = () => { // getAll-funktio on määritelty, jotta voimme hakea kaikki tuotteet API:sta. Tämä funktio tekee GET-pyynnön baseUrl-osoitteeseen ja palauttaa vastauksena saadun datan. Axiosin get-metodi palauttaa promisen, joten käytämme then-metodia käsittelemään vastauksen, jossa response.data sisältää API:sta palautuneet tuotteet.
    const request = Axios.get(baseUrl)
    return request.then(response => response.data);
}

const create = newProduct => {
    return Axios.post(baseUrl, newProduct);
}

const edit = (object) => {
    return Axios.put(`${baseUrl}/${object.productId}`, object);
}
const remove = id => {
    return Axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, create, edit, remove }; // Tämä rivi vie getAll-, create-, edit- ja remove-funktiot ulos tästä moduulista, jotta niitä voidaan käyttää muissa tiedostoissa. Näin voimme tuoda tämän palvelun muihin komponentteihin ja käyttää getAll-, create-, edit- ja remove-funktioita hakeaksemme, luodaksemme, muokataksemme ja poistaaksemme tuotteita API:sta.