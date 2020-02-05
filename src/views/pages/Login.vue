<template>
  <div class="app jo-login">
    <div class="container">
      <div class="row">
          <img src="img/logo.svg"/>
      </div>
      <div class="flex-row mt-5 align-items-center">
        <b-row class="justify-content-center text-center">
        <b-col md="5">
          <h1>Let’s get started</h1>
          <h3>Welcome Back!</h3>
          <p> Sign In to your account</p>
          <b-card-group >
            <b-card no-body class="p-4 jo-trans">
              <b-card-body>
                <b-form>
                  <!-- <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p> -->
                  <b-input-group class="mb-3">
                    
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      v-model="email"
                      autocomplete="username email"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">

                    <b-form-input
                      type="password"
                      class="form-control"
                      v-model="password"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
          
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                  <b-button
                        variant="primary"
                        class="px-4 btn-block"
                        @click="login()"
                        :disabled="loading"
                      >Login</b-button>
                </b-form>
              </b-card-body>
            </b-card>
           
          </b-card-group>
        </b-col>
      </b-row>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import router from "../../router";

export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  computed: {},
  methods: {
    ...mapActions({ loginUser: "LOGIN" }),
    async login() {
      this.loading = true;
      await this.loginUser({
        email: this.email,
        password: this.password
      })
        .then(function(res) {
          router.push("/dashboard");
        })
        .catch(error => {
          if (error.error) {
            this.$toastr.error(error.error, "Login Failed!", { timeOut: 5000 });
          }
        });
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>