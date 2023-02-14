import axios from 'axios';
import {apibaseUrl} from '../constants/constants';

const instance = axios.create({
    baseURL:apibaseUrl
});

export default instance