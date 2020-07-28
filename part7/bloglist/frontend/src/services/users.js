import axios from "axios";
const url = "/api/users";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const getUser = async (id) => {
  const request = axios.get(`${url}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, getUser };
