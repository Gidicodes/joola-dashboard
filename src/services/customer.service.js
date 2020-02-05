import {ApiService} from "./api.service";

const customer = {
    getAll: async () => {
        return await ApiService.get('/admin/customer/').then((res)=> {
            return Promise.resolve(res.data);
        }).catch((error) =>{
            return Promise.reject(error.response.data);
        });
    }

}

export {customer}

