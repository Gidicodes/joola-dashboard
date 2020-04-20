import {ApiService} from "./api.service";

const chat = {
    getAll: async (perPage = 30, page = 1) => {
        return await ApiService.get('/admin/chat?perPage=' + perPage + '&page=' + page).then((res)=> {
            return Promise.resolve(res.data);
        }).catch((error) =>{
            return Promise.reject(error.response.data);
        });
    },
    getChatHistory: async ({id:id}) => {
        return await ApiService.get('/admin/chat/'+id).then((res)=>{
            return Promise.resolve(res.data);
        }).catch((error)=>{
            return Promise.reject(error.response.data);
        });
    },
    postMessage: async ({id:id,message:message}) => {
        return await ApiService.post('/admin/chat', {
            id: id,
            message: message,
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((err) => {
            return Promise.reject(err.response.data);
        });
    },
};

export {chat};
