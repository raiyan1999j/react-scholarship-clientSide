import axios from "axios";

export const publicRoute = axios.create({
    baseURL:'http://localhost:5000/'
})