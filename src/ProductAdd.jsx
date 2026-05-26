import React, {useState} from 'react';
import ProductServices from './services/Products';
import Product from './Product';
import EditProduct from './EditProduct';

const ProductAdd = ({setLisäystila}) => {

    const [newProductName, setNewProductName] = useState('');
    const [newSupplierId, setNewSupplierId] = useState('');
    const [newCategoryId, setNewCategoryId] = useState('');

    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('');
    const [newUnitPrice, setNewUnitPrice] = useState('');
    const [newUnitsInStock, setNewUnitsInStock] = useState('');

    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('');
    const [newReorderLevel, setNewReorderLevel] = useState('');
    const [newDiscontinued, setNewDiscontinued] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        var newProduct = {
            productName: newProductName,
            supplierId: Number(newSupplierId),
            categoryId: Number(newCategoryId),
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: Number(newUnitPrice),
            unitsInStock: Number(newUnitsInStock),
            unitsOnOrder: Number(newUnitsOnOrder),
            reorderLevel: Number(newReorderLevel),
            discontinued: newDiscontinued
        }
        ProductServices.create(newProduct)
        .then(() => {
            setLisäystila(false);
        })
        .catch(error => {
            alert("Tuotteen lisäys epäonnistui: " + error.message);
        })
    }

return (

    <div id="addNewProduct">
        <h2>Tuotteiden lisäys komponentti</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product name: </label>
                <input type="text" value={newProductName} onChange={({target}) => setNewProductName(target.value)} placeholder="Product name" required />
            </div>
            <div>
                <label>Supplier ID: </label>
                <input type="number" value={newSupplierId} onChange={({target}) => setNewSupplierId(target.value)} placeholder="Supplier ID" required />
            </div>
            <div>
                <label>Category ID: </label>
                <input type="number" value={newCategoryId} onChange={({target}) => setNewCategoryId(target.value)} placeholder="Category ID" required />
            </div>
            <div>
                <label>Quantity per unit: </label>
                <input type="text" value={newQuantityPerUnit} onChange={({target}) => setNewQuantityPerUnit(target.value)} placeholder="Quantity per unit" required />
            </div>
            <div>
                <label>Unit price: </label>
                <input type="number" step="0.01" value={newUnitPrice} onChange={({target}) => setNewUnitPrice(target.value)} placeholder="Unit price" required />
            </div>
            <div>
                <label>Units in stock: </label>
                <input type="number" value={newUnitsInStock} onChange={({target}) => setNewUnitsInStock(target.value)} placeholder="Units in stock" required />
            </div>
            <div>
                <label>Units on order: </label>
                <input type="number" value={newUnitsOnOrder} onChange={({target}) => setNewUnitsOnOrder(target.value)} placeholder="Units on order" required />
            </div>
            <div>
                <label>Reorder level: </label>
                <input type="number" value={newReorderLevel} onChange={({target}) => setNewReorderLevel(target.value)} placeholder="Reorder level" required />
            </div>
            <div>
                <label>Discontinued: </label>
                <input type="checkbox" checked={newDiscontinued} onChange={({target}) => setNewDiscontinued(target.checked)} />
            </div>
            <input className="saveButton" type="submit" value="Save" />
            <input className="backButton" type="button" value="Back" onClick={() => setLisäystila(false)} />
        </form>
    </div>
    )
}
export default ProductAdd;