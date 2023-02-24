import axios from 'axios';
import {apibaseUrl} from '../constants/constants';


const accessToken = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
const access = accessToken?accessToken.access:null
// const accessToken = 'ewefeefe123e2132'

const instance = axios.create({
    baseURL:apibaseUrl,
    headers: {
        'Authorization': 'Bearer ' + access
      }
});

export default instance