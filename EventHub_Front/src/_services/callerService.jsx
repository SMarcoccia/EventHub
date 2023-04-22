import axios from "axios";

const Axios=axios.create({
    baseURL: "http://localhost:8081/api"
})

export default Axios;