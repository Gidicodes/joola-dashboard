import {ApiService} from "./api.service";

const setting = {
    getBaseLocation: async () => {
        return await ApiService.get('/admin/setting/location').then((res)=> {
            return Promise.resolve(res.data);
        }).catch((error) =>{
            return Promise.reject(error.response.data);
        });
    },
    postBaseLocation: async ({address:address,lat:lat,lon:lon}) => {
        return await ApiService.post('/admin/setting/location', {
            address:address,
            lat:lat,
            lon:lon,
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((err) => {
            return Promise.reject(err.response.data);
        });
    },
};

export {setting};
