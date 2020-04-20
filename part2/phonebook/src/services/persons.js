import axios from "axios";

const baseUrl = "http://localhost:3001/persons/";

// axios.get("http://localhost:3001/persons").then((response) => {
//       setPersons(response.data);
//     });

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(baseUrl + id);
  return request.then((response) => response);
};

export default { getAll, create, remove };
