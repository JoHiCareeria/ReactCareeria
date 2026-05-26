import Axios from 'axios';

const baseUrl = "http://localhost:5222/api/Authentication";

const authenticate = (userForAuth) => {
    const request = Axios.post(baseUrl, userForAuth)
    return request.then(response => response);
}
export default { authenticate };