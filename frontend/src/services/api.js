import axios from 'axios';

const api = axios.create({
    // baseURL:'http://localhost:8000'
    baseURL:'https://start.vps-kinghost.net:8000/'
})


export default api;