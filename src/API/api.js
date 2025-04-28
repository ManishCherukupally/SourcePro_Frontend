import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'
const client = axios.create(
    // {
    //     baseURL: 'http://3.109.9.214:8000/sourcepro/'
    // }
    {
        baseURL: 'http://127.0.0.1:8000/sourcepro/'
    }
)

export default client