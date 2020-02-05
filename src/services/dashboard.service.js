import {ApiService} from "./api.service";

const report = {
    getAll: async () => {
        return await ApiService.get('/admin/report/summary').then((res)=> {
            return Promise.resolve(res.data);
        }).catch((error) =>{
            return Promise.reject(error.response.data);
        });
    }

}

export {report}

