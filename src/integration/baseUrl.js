import axios from 'axios';

const baseUrl = axios.create({
    baseURL:'http://shaketshah.in/'
})

export default baseUrl;