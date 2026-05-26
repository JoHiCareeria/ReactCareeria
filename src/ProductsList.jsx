import './App.css' // App.css-tiedosto on tuotu tähän tiedostoon, jotta voimme käyttää sen määrittelemiä tyylejä tässä komponentissa. Tämä mahdollistaa yhtenäisen ulkoasun ja tyylin sovelluksen eri osissa, mukaan lukien tämä Product-komponentti.
import React, { useState, useEffect } from 'react' // React-kirjasto on tuotu tähän tiedostoon, jotta voimme käyttää Reactin ominaisuuksia, kuten komponentteja, tilaa (state) ja sivuvaikutuksia (effects). useState-hook mahdollistaa tilan käytön funktionaalisissa komponenteissa, kun taas useEffect-hook mahdollistaa sivuvaikutusten hallinnan, kuten datan hakemisen API:sta komponentin elinkaaren aikana.
import ProductServices from './services/Products'; // ProductServices on tuotu tähän tiedostoon, jotta voimme käyttää sen tarjoamia funktioita, kuten tuotteiden hakua API:sta. Tämä palvelu on todennäköisesti määritelty erillisessä tiedostossa (services/Products.js) ja sisältää logiikkaa API-kutsujen tekemiseen ja datan käsittelyyn. Tämän avulla voimme pitää API-kutsut erillään komponenttien logiikasta, mikä parantaa koodin organisointia ja uudelleenkäytettävyyttä.
import Product from './Product'; // Product-komponentti on tuotu tähän tiedostoon, jotta voimme käyttää sitä näyttämään yksittäisen tuotteen tietoja. Tämä komponentti on todennäköisesti määritelty erillisessä tiedostossa (Product.jsx) ja sisältää logiikkaa tuotetietojen renderöimiseen taulukkomuodossa. Tuomalla tämän komponentin, voimme käyttää sitä osana ProductsList-komponenttia, joka näyttää listan tuotteista API:sta haettuna. Tämä edistää komponenttipohjaista arkkitehtuuria, jossa pienemmät komponentit voidaan yhdistää suuremmiksi kokonaisuuksiksi.
import ProductAdd from './ProductAdd'; // ProductAdd-komponentti on tuotu tähän tiedostoon, jotta voimme käyttää sitä tuotteiden lisäämiseen. Tämä komponentti on todennäköisesti määritelty erillisessä tiedostossa (ProductAdd.jsx) ja sisältää logiikkaa uuden tuotteen luomiseen ja lähettämiseen API:lle. Tuomalla tämän komponentin, voimme käyttää sitä osana ProductsList-komponenttia, jolloin käyttäjät voivat helposti lisätä uusia tuotteita suoraan tuotelistauksesta käsin. Tämä parantaa käyttökokemusta ja tekee sovelluksesta interaktiivisemman.
import EditProduct from './EditProduct';


const ProductsList = () => { // ProductsList-komponentti on määritelty, joka toimii pääkomponenttina tuotteiden listaukselle. Tämä komponentti käyttää useState-hookia hallitsemaan tuotteiden tilaa (products) ja näkyvyyttä (showProducts). useEffect-hookin avulla haetaan tuotteet API:sta, kun komponentti renderöidään ensimmäisen kerran. Komponentti renderöi otsikon "Products", joka on klikattavissa, ja kun sitä klikataan, se togglaa showProducts-tilan, mikä puolestaan näyttää tai piilottaa tuotteiden listan. Tuotteet renderöidään map-funktion avulla, jossa jokainen tuote näytetään Product-komponentin kautta.
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false); 
    const [lisäysTila, setLisäystila] = useState(false);
    const [muokattavaProduct, setMuokattavaProduct] = useState(false);

    useEffect(() => { // useEffect-hook on määritelty, jotta voimme hakea tuotteet API:sta, kun komponentti renderöidään ensimmäisen kerran. Tämä hook ottaa funktioargumentin, joka suoritetaan, ja riippuvuuslistan määrittelee milloin funktio suoritetaan uudestaan.
        ProductServices.getAll()
        .then(data => {
            setProducts(data);
        })
    }, [lisäysTila, muokattavaProduct]) // Riippuvuuslistassa on lisäysTila ja muokattavaProduct, mikä tarkoittaa, että useEffect suoritetaan uudestaan aina, kun jompikumpi näistä tilamuuttujista muuttuu. Tämä varmistaa, että tuotteiden lista päivittyy automaattisesti, kun uusi tuote lisätään tai olemassa olevaa tuotetta muokataan.;

    return ( // Tämä return-lause määrittelee, mitä JSX-koodia renderöidään, kun ProductsList-komponentti käytetään. JSX-koodi sisältää otsikon "Products", joka on klikattavissa. Kun otsikkoa klikataan, showProducts-tila togglaa, mikä puolestaan näyttää tai piilottaa tuotteiden listan. Tuotteet renderöidään map-funktion avulla, jossa jokainen tuote näytetään Product-komponentin kautta. Jokaiselle tuotteelle annetaan avain (key) productId:n perusteella, mikä auttaa Reactia optimoimaan uudelleenrenderöinnin.
        <>
        <h1><nobr style={{cursor: "pointer"}} onClick={() => setShowProducts(!showProducts)}>Products</nobr>
        {!lisäysTila && <button className="addNappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>
        
        {lisäysTila &&<ProductAdd setLisäystila={setLisäystila} />}
        
        {muokattavaProduct && <EditProduct setMuokattavaProduct={setMuokattavaProduct} muokattavaProduct={muokattavaProduct} />}

        {showProducts && !muokattavaProduct && products && products.map(p => ( // Tämä map-funktio käy läpi products-taulukon ja renderöi jokaiselle tuotteelle Product-komponentin. Jokaiselle Product-komponentille annetaan avain (key) productId:n perusteella, mikä auttaa Reactia optimoimaan uudelleenrenderöinnin. Tuotteen tiedot välitetään Product-komponentille product-prop:n kautta, ja setMuokattavaProduct-funktio välitetään muokattavaProduct-prop:n kautta, jotta Product-komponentti voi asettaa muokattavan tuotteen tilaan, kun Edit-painiketta klikataan.
            <div key={p.productId}> 
                <Product product={p} muokattavaProduct={setMuokattavaProduct} /> 
            </div>
        ))}
        </>
    )
}
export default ProductsList; // Tämä rivi vie ProductsList-komponentin ulos tästä moduulista, jotta sitä voidaan käyttää muissa tiedostoissa. Näin voimme tuoda tämän komponentin muihin osiin sovellusta ja käyttää sitä tuotteiden listauksen näyttämiseen.
