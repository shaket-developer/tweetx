import axios from 'axios';

const baseUrl = axios.create({
    baseURL:'http://localhost/tweetxCI'
})

export default baseUrl;