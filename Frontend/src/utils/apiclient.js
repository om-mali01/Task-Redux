import axios from "axios";

const apiclient = axios.create({
    baseURL:"http://127.0.0.1:5000",
    headers:{
        'Content-Type':'application/json'
    }
});

apiclient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default apiclient