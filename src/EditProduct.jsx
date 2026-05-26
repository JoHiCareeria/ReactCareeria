import React, {useState} from 'react';
import ProductService from './services/Products';

const EditProduct = ({ muokattavaProduct, setMuokattavaProduct }) => {
    const [newProductId, setNewProductId] = useState(muokattavaProduct.productId);
    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName);
    const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId);
    const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId);
    
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit);
    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice);
    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock);
    
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder);
    const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel);
    const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued);

    const handleSubmit = (event) => {
        event.preventDefault();
        var updatedProduct = {
            productId: newProductId,
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
        ProductService.edit(updatedProduct)
        .then(() => {
            alert("Tuotteen päivitys onnistui: " + updatedProduct.productName);
            setMuokattavaProduct(false);
        })
        .catch(error => {
            alert("Tuotteen päivitys epäonnistui: " + error.message);
        })
    }

    return (
        <div className="updateForm">
            <h3>Update</h3>
            <form onSubmit={handleSubmit}>
            <div>
            <label>Product ID : </label>
            <input type="text" value={newProductId} onChange={(e) => setNewProductId(e.target.value)} placeholder="Product ID" disabled={true} />
            </div>
            <div>
            <label>Product Name : </label>
            <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} placeholder="Product Name" />
            </div>
            <div>
            <label>Supplier ID : </label>
            <input type="text" value={newSupplierId} onChange={(e) => setNewSupplierId(e.target.value)} placeholder="Supplier ID" />
            </div>
             <div>
            <label>Category ID : </label>
            <input type="text" value={newCategoryId} onChange={(e) => setNewCategoryId(e.target.value)} placeholder="Category ID" />
            </div>
            <div>
            <label>Quantity Per Unit : </label>
            <input type="text" value={newQuantityPerUnit} onChange={(e) => setNewQuantityPerUnit(e.target.value)} placeholder="Quantity Per Unit" />
            </div>
            <div>
            <label>Unit Price : </label>
            <input type="text" value={newUnitPrice} onChange={(e) => setNewUnitPrice(e.target.value)} placeholder="Unit Price" />
            </div>
            <div>
            <label>Units In Stock : </label>
            <input type="text" value={newUnitsInStock} onChange={(e) => setNewUnitsInStock(e.target.value)} placeholder="Units In Stock" />
            </div>
            <div>
            <label>Units On Order : </label>
            <input type="text" value={newUnitsOnOrder} onChange={(e) => setNewUnitsOnOrder(e.target.value)} placeholder="Units On Order" />
            </div>
            <div>
            <label>Reorder Level : </label>
            <input type="text" value={newReorderLevel} onChange={(e) => setNewReorderLevel(e.target.value)} placeholder="Reorder Level" />
            </div>
            <div>
            <label>
                <input type="checkbox" checked={newDiscontinued} onChange={(e) => setNewDiscontinued(e.target.checked)} /> Discontinued
            </label>
            </div>
            <div>
                <input type="submit" value="Edit" />
                <input type="button" value="Back" onClick={() => setMuokattavaProduct(false)} />
            </div>
            </form>
        </div>
    )
}
export default EditProduct;