// axiosConfig.js

import axios from "axios";

console.log("process.env.REACT_APP_SERVER_ORIGIN", process.env.REACT_APP_SERVER_ORIGIN)

const API_URL = process.env.REACT_APP_SERVER_ORIGIN;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true 
})
   

export default api;



