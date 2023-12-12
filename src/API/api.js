import axios from "axios";
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'
const client = axios.create(
    {
        baseURL: 'http://0.0.0.0/sourcepro/'
    }
)
export default client