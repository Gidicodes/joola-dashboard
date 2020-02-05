import {ApiService} from "./api.service";

const userService = {
    login: ({email, password,}) => {
        return new Promise(function (resolve, reject) {
            ApiService.post('/admin/login', {email: email, password: password}).then(async (res) => {
                let token = res.data.data.token;
                resolve(token);
            }).catch((error) => {
                reject(error.response.data);
            });
        });
    },
    authorize: async (token) => {
        return await ApiService.customRequest({
            headers: {'Authorization': "Bearer "+token},
            method: "GET",
            url: ApiService.getBaseUrl() + "/user"
        }).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    register: async ({first_name,last_name,email,password}) => {
        return await ApiService.post('/admin/register', {
            first_name:first_name,
            last_name: last_name,
            email: email,
            password: password,
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    }
};

export {userService};
