import axios from 'axios'

const ApiService = {
    baseUrl: '',
    init(baseURL) {
        ApiService.baseUrl = baseURL;
        axios.defaults.baseURL = baseURL;
    },
    getBaseUrl() {
        return ApiService.baseUrl;
    },
    setHeader(token) {
        axios.defaults.headers.common["Authorization"] ="Bearer "+token;
        // axios.defaults.headers.common["Accept"] ="application/json";
        // axios.defaults.headers.common["Content-Type"] ="multipart/form-data";
    },
    removeHeader() {
        axios.defaults.headers.common = {}
    },
    get(resource) {
        return axios.get(resource)
    },
    patch(resource,data){
        return axios.patch(resource,data)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
     **/
    customRequest(data) {
        return axios(data)
    }
};

export {ApiService};
