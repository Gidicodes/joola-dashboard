<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="First name" v-model="first_name" autocomplete="first_name" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Last name" v-model="last_name" autocomplete="last_name" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Email" v-model="email" autocomplete="email" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="Password" v-model="password" autocomplete="new-password" />
                </b-input-group>


                <b-button variant="success" block @click="Register()" :disabled="loading">Create Account</b-button>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col>
                  <b-button block variant="primary" class="active" to="/login"><span>Login</span></b-button>
                </b-col>

              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import router from '../../router';

export default {
  name: 'Register',

  data: function () {
            return {
                first_name:'',
                last_name: '',
                email:'',
                password: '',
                loading: false,
                isSuccess: false,
            }
        },

        methods: {
          ...mapActions({registerUser: 'REGISTER'}),
            async Register() {
                this.loading = true;
                await this.registerUser({
                    first_name:this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password,
                }).then((res) => {
                    this.$toastr.success('', "Success", {timeOut: 5000});
                    router.push('dashboard')
                }).catch((error) => {
                  console.log(error)
                    this.$toastr.error(JSON.stringify(error.errors), "signup failed!", {timeOut: 5000});
                });
                this.loading = false;

            },


        }


}
</script>
