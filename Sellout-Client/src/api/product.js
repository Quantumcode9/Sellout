import axios from 'axios';
import apiUrl from '../apiConfig'

export const searchProducts = (keyword) => {
  return axios.get(`${apiUrl}/search/${keyword}`);
};
