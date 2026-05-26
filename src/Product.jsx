import App from './App.css' // App.css-tiedosto on tuotu tähän tiedostoon, jotta voimme käyttää sen määrittelemiä tyylejä tässä komponentissa.
import React, {useState} from 'react'; // React-kirjasto on tuotu tähän tiedostoon, jotta voimme käyttää Reactin ominaisuuksia, kuten komponentteja ja tilaa.
import ProductList from './ProductsList'; // ProductList-komponentti on tuotu tähän tiedostoon, jotta voimme käyttää sitä näyttämään listan tuotteista. Tämä komponentti on todennäköisesti määritelty erillisessä tiedostossa (ProductsList.jsx) ja sisältää logiikkaa tuotteiden hakemiseen API:sta ja niiden renderöimiseen.
import ProductService from './services/Products'; // ProductService on tuotu tähän tiedostoon, jotta voimme käyttää sen tarjoamia funktioita, kuten tuotteiden hakua API:sta. Tämä palvelu on todennäköisesti määritelty erillisessä tiedostossa (services/Products.js) ja sisältää logiikkaa API-kutsujen tekemiseen ja datan käsittelyyn.

const Product = ({product, muokattavaProduct}) => { // Product-komponentti on määritelty, joka ottaa vastaan product-prop:n. Tämä prop sisältää todennäköisesti yksittäisen tuotteen tiedot, kuten nimen, hinnan, varastotiedot jne. Komponentti käyttää näitä tietoja renderöidäkseen tuotteen tiedot taulukkomuodossa. Tämä komponentti on hyödyllinen, kun haluamme näyttää yksittäisen tuotteen tietoja erikseen tai osana suurempaa tuotelistaa.

const poistaProduct = (product) => {
    let vastaus = window.confirm("Poistetaanko tuote " + product.productName + "?");

    if (vastaus === true) {
        ProductService.remove(product.productId)
        .then(res => {
            if (res.status === 200) {
                alert("Tuote " + product.productName + " on poistettu onnistuneesti!");
                window.location.reload();
            }
        })
        .catch(error => {
            alert("Tuotteen poistaminen epäonnistui: " + error.message);
        })
    }
}
    

    return ( // Tämä return-lause määrittelee, mitä JSX-koodia renderöidään, kun Product-komponentti käytetään. Tässä tapauksessa se renderöi taulukon, jossa näytetään tuotteen tiedot. Taulukossa on otsikkorivi (thead), jossa määritellään sarakkeiden nimet, ja runkorivi (tbody), jossa näytetään tuotteen tiedot. Jokainen td-elementti vastaa yhtä tuotteen ominaisuutta, kuten productName, supplierId, categoryId jne. Tämä rakenne tekee tuotetiedot selkeiksi ja helposti luettaviksi käyttäjälle.
        <table className="productTable">
            <thead>
                <tr>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Supplier Id</th>
                    <th>Category Id</th>
                    <th>QuantityPerUnit</th>
                    <th>UnitPrice</th>
                    <th>UnitsInStock</th>
                    <th>UnitsOnOrder</th>
                    <th>ReorderLevel</th>
                    <th>Discontinued</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><button className="editButton" onClick={() => muokattavaProduct(product)}>Edit</button></td>
                    <td><button className="deleteButton" onClick={() => poistaProduct(product)}>Delete</button></td>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.supplierId}</td>
                    <td>{product.categoryId}</td>
                    <td>{product.quantityPerUnit}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.unitsInStock}</td>
                    <td>{product.unitsOnOrder}</td>
                    <td>{product.reorderLevel}</td>
                    <td>{product.discontinued}</td>
                </tr>
            </tbody>
        </table>

    )
}
export default Product;