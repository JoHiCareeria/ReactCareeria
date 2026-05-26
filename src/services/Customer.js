import Axios from "axios";

const baseUrl = "http://localhost:5222/api/customers";

const getAll = () => {
    const request = Axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newCustomer => {
    return Axios.post(baseUrl, newCustomer);
}

const remove = id => {
    return Axios.delete(`${baseUrl}/${id}`);
}

const update = (object) => {
    return Axios.put(`${baseUrl}/${object.customerId}`, object);
}

export default { getAll, create, remove, update };