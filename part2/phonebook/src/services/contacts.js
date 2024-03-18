import axios from 'axios';
const baseUrl = 'http://localhost:5000/persons';

const getAll = async () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data).catch((error) => console.log(error));
};

const create = async (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data).catch((error) => console.log(error));
};

const deleteContact = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data).catch((error) => console.log(error));
};

export default { getAll, create, deleteContact };
