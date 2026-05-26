import Axios from 'axios';

const baseUrl = 'http://localhost:5222/api/employees';

const getAll = () => {
    const request = Axios.get(baseUrl);
    return request.then(response => response.data);
}
const create = newEmployee => {
    return Axios.post(baseUrl, newEmployee);
}
const edit = (object) => {
    return Axios.put(`${baseUrl}/${object.employeeId}`, object);
}
const remove = id => {
    return Axios.delete(`${baseUrl}/${id}`);
}

export default { getAll,create, edit, remove };