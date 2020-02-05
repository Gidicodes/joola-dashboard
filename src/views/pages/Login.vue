<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      v-model="email"
                      autocomplete="username email"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
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
                      <b-button
                        variant="primary"
                        class="px-4"
                        @click="login()"
                        :disabled="loading"
                      >Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Joola Admin users can be created, but the account wont be
                    active until its activated by an admin
                  </p>
                  <router-link :to="{ name: 'register' }">
                    <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                  </router-link>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
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
