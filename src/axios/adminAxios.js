import axios from 'axios';
import {adminApibaseUrl} from '../constants/constants';

const instance = axios.create({
    baseURL:adminApibaseUrl
});

export default instance