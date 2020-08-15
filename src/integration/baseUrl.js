import axios from 'axios';

const baseUrl = axios.create({
    baseURL:'http://localhost/tweetx-backend/'
})

export default baseUrl;