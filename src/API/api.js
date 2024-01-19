import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'
const client = axios.create(
    {
        baseURL: 'http://3.110.168.213:8000/sourcepro/'
    }
)

export default client