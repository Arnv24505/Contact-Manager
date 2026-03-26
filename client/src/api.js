import axios from 'axios';

const API = axios.create({
  baseURL: 'https://contact-manager-1-jm72.onrender.com/api',
});

export default API;