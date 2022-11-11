import axios from 'axios';

const api = axios.create({
  baseURL:'https://start.vps-kinghost.net:8000/'
})

export default api;