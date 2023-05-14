import * as _axios from 'axios';
import environment from './environment/env';

const { baseURL } = environment;
const axios = _axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axios;
