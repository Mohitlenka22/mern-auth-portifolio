import axios from "axios";

const instance = axios.create({
    // https://backendjs-pf2r.onrender.com
    // baseURL: "http://localhost:3001/",
    baseURL: "https://backendjs-pf2r.onrender.com/"
});

export default instance;