import Axios from "axios";

const baseUrl = "http://localhost:5222/api/customers";

const getAll = () => {
    const request = Axios.get(baseUrl);
    return request.then(response => response.data);
}

export default { getAll };