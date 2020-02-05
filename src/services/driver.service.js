import {ApiService} from "./api.service";

const driver = {
    getDrivers: async () => {
        return await ApiService.get('/admin/driver/').then((res)=> {
            return Promise.resolve(res.data);
        }).catch((error) =>{
            return Promise.reject(error.response.data);
        });
    },

    register: async ({first_name,last_name,email,password, phone, bank_name, acc_name, acc_number, driving_license}) => {
        return await ApiService.post('/admin/driver/create', {
            first_name:first_name,
            last_name: last_name,
            email: email,
            password: password,
            phone: phone,
            bank_name: bank_name,
            account_name: acc_name,
            account_number:acc_number,
            driving_license: driving_license
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    }


}

export {driver}

