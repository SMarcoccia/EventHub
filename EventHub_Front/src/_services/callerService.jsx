import axios from "axios";

const Axios=axios.create({
    baseURL: "http://localhost:8081"
})

export default Axios;