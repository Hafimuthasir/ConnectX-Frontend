import axios from 'axios';
import {apibaseUrl} from '../constants/constants';


const accessToken = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
console.log('aaaaaaaaaa',accessToken.access);
// const accessToken = 'ewefeefe123e2132'

const instance = axios.create({
    baseURL:apibaseUrl,
    headers: {
        'Authorization': 'Bearer ' + accessToken.access
      }
});

export default instance