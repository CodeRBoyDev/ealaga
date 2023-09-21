import axios from 'axios';

// const API_URL = 'https://ealaga.vercel.app';
// const API_URL = 'https://ealaga-5v97.onrender.com/';

//const API_URL = 'https://web-production-6235.up.railway.app/';
// const API_URL = 'https://ealaga-server.onrender.com';
// const API_URL = 'http://localhost:4000';
const API_URL = 'http://192.168.100.17:4000'; 

axios.defaults.baseURL = API_URL;

const token = JSON.parse(localStorage.getItem('token'));

console.log(token)
axios.defaults.headers.common = {
'Content-Type': 'application/json',
Authorization: `Bearer ${token || ''}`
};

export const updateToken = (newToken) => {
const tokenss = newToken;
axios.defaults.headers.common.Authorization = `Bearer ${tokenss}`;
};


export default axios;
