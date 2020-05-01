import { ApiService } from "./api.service";

const trip = {
    getAll: async (perPage = 15, page = 1) => {
        return await ApiService.get('/admin/trip/pending?perPage=' + perPage + '&page=' + page).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    getTrip: async ({ id: id }) => {
        return await ApiService.get('/admin/trip/' + id).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },

    getInProgress: async (perPage = 15, page = 1) => {
        return await ApiService.get('/admin/trip/progress?perPage=' + perPage + '&page=' + page).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    assignDriver: async ({ id, driver, amount }) => {
        return await ApiService.post('/admin/trip/' + id, {
            uuid: driver, amount: amount
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.respnse.data);
        });
    },
    deleteTrip: async ({ id }) => {
        return await ApiService.delete('/admin/trip/' + id).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.respnse.data);
        })
    }
};

export { trip };
