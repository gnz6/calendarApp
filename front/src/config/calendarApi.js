import axios from "axios";



const calendarApi = axios.create({
    baseURL: "http://localhost:3001/api"
})

calendarApi.interceptors.request.use( config =>{
    config.headers = {
        ...config.headers,
        "x-access-token":localStorage.getItem("token")
    }
    return config
})


export default calendarApi;