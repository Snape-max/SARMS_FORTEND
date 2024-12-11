import config from "./config";
import axios from 'axios';

const API_URL = config.apiUrl;


export default {
    login: (credentials) => {
        return axios.post(`${API_URL}/login`, credentials)
    },
    register: (userData) => {
        return axios.post(`${API_URL}/register`, userData)
    },
    query: (filters, token) => {
        return axios.post(`${API_URL}/query`, null, {
            params: filters,
            headers: {
                'x-access-token': token 
            }
        })
    },
    modeify: (filters, token) => {
        return axios.post(`${API_URL}/modify`, null, {
            params: filters,
            headers: {
                'x-access-token': token 
            }
        })
    },
    info: (token) => {
        return axios.post(`${API_URL}/info`,null, {
            headers: {
                'x-access-token': token 
            }
        })
    }
}

