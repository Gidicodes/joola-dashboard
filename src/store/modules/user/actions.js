import { userService } from "../../../services/user.service";
import { setting } from "../../../services/setting.service";
import { ApiService } from "../../../services/api.service";

const actions = {
  UNSET_USER: context => context.commit("REMOVE_AUTH"),
  isLoggedIn(context) {
    // Fetch the User token
    return context.getters.IS_AUTHENTICATED;
  },
  LOGIN: async (context, { email, password, client_id }) => {
    return await userService
      .login({ email: email, password: password })
      .then(async token => {
        console.log(token);
        // Store the User Token
        context.commit("SET_AUTH_TOKEN", token);
        let authorize = await context.dispatch("AUTHORISE_USER", token);
        ApiService.setHeader(token);
        return Promise.resolve(authorize);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  AUTHORISE_USER: async (context, token) => {
    return await userService
      .authorize(token)
      .then(res => {
        console.log(res)
        context.commit("SET_USER_DATA", res);
        return true;
      })
      .catch(err => {
        window.console.log(err);
        return false;
      });
  },
  REGISTER: async (context, { first_name, last_name, email, password }) => {
    return await userService
      .register({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      })
      .then(async res => {
        console.log(res);
        // Store the User Token
        let token = res.data.token
        context.commit("SET_AUTH_TOKEN", token);
        context.commit("SET_USER_DATA", res.data.user);
        ApiService.setHeader(token);
        return true
      }).catch(error => {
        return Promise.reject(error);
      });

  },
  GetNotification: async(context)=> {
    return await userService.getNotification().then((res) => {
      context.commit("SET_NOTIFICATION", res.data)
      return true
    }).catch((error)=> {
      return Promise.reject(error);
    });
  },
  GetBaseLocation: async(context) => {
    return await setting.getBaseLocation().then((res)=> {
      context.commit("SET_BASE_LOCATION", res.data)
      return true
    }).catch(error => {
      return Promise.reject(error);
    })
  }
};

export { actions };
