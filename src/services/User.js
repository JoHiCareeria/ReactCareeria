import Axios from "axios";

const baseUrl = "http://localhost:5222/api/users";

const getAll = () => {
    const request = Axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newUser => {
    return Axios.post(`${baseUrl}/create`, newUser)
}
const remove = id => {
    return Axios.delete(`${baseUrl}/${id}`);
}

const update = (object) => {
    return Axios.post(`${baseUrl}/edit`, object);
}

export default { getAll, create, remove, update };