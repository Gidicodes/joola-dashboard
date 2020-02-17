import {ApiService} from "./api.service";

const customer = {
    getAll: async (perPage=15, page=1) => {
        return await ApiService.get('/admin/customer/?perPage=' + perPage + '&page=' + page).then((res)=> {
            return Promise.resolve(res.data);
        }).catch((error) =>{
            return Promise.reject(error.response.data);
        });
    }

}

export {customer}

