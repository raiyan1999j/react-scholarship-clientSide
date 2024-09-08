import axios from "axios";

export const publicRoute = axios.create({
    baseURL: 'http://localhost:5000/'
})

// baseURL:'http://localhost:5000/'
// "https://assignment-12-brown.vercel.app/"