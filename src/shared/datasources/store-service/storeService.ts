import axios from 'axios';

const storeService = axios.create({
  baseURL: `${import.meta.env.VITE_STORE_SERVICE}`
});

export default storeService;
