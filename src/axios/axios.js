import axios from 'axios';
import {apibaseUrl} from '../constants/constants';


const accessToken = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
console.log('aaaaaaaaaa',accessToken.access);
const access = accessToken.access?accessToken.access:""
// const accessToken = 'ewefeefe123e2132'

const instance = axios.create({
    baseURL:apibaseUrl,
    headers: {
        'Authorization': 'Bearer ' + access
      }
});

export default instance