import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burgerbuilder-nvn.firebaseio.com/'
});

export default instance;
