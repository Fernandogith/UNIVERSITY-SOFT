import axios from 'axios';

const api = axios.create({
  baseURL:'http://start.vps-kinghost.net:8000'
})

export default api;