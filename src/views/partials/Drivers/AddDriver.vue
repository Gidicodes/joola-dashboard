<template>
    <div>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader :loading-text="loadingText" :showFull=true v-if="isLoading"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        New Driver
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->

                                <div class="card-body">
                                    <h4 class="card-title"></h4>
                                    <div class="row">
                                        <div class="jo-form">
                                            <div class="jo-form-label">
                                                <label for="">Personal details</label>
                                            </div>
                                            <div class="jo-form-group">
                                                <div>
                                                    <label>First Name</label>
                                                    <input class="jo-input-dark" type="text" name="first_name" v-model="first_name"/>
                                                </div>
                                                <div>
                                                    <label>Last Name</label>
                                                    <input class="jo-input-dark" type="text" name="last_name" v-model="last_name"/>
                                                </div>
                                                <div>
                                                    <label>Email</label>
                                                    <input class="jo-input-dark" type="text" name="email" v-model="email"/>
                                                </div>
                                                <div>
                                                    <label>Phone Number</label>
                                                    <input class="jo-input-dark" type="text" v-model="phone"/>
                                                </div>
                                                <div>
                                                    <label>Password</label>
                                                    <input class="jo-input-dark" type="password" readonly name="password" v-model="password"/>
                                                </div>
                                                <div>
                                                    <label>Driving License</label>
                                                    <input class="jo-input-dark" type="text" v-model="driving_license"/>
                                                </div>
                                                <div>
                                                    <label> Click this button to generate password </label>
                                                    <button class="btn btn-secondary" @click="genStr()">Generate Password</button>
                                                </div>
                            
                                            </div>
                                        </div>


                                        <div class="jo-form mt-5">
                                            <div class="jo-form-label">
                                                <label for="">Bank details</label>
                                            </div>
                                            <div class="jo-form-group">
                                                <div>
                                                    <label>Bank Name</label>
                                                    <input class="jo-input-dark" type="text" v-model="bank_name"/>
                                                </div>
                                                <div>
                                                    <label>Account Name</label>
                                                    <input class="jo-input-dark" type="text"  v-model="acc_name"/>
                                                </div>
                                                <div>
                                                    <label>Account Number</label>
                                                    <input class="jo-input-dark" type="text"  v-model="acc_number"/>
                                                </div>
                            
                                            </div>
                                            
                                        </div>
                                         <div class="jo-form mt-5">
                                            <div class="jo-form-label">
                                            </div>
                                            <div class="jo-form-group">
                                                <div>
                                                </div>
                                                <div>
                                                    <button class="btn btn-primary" @click="createUser()"> Submit </button>

                                                </div>
                                            </div>
                                         </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    // import Layout from '../../components/Layout';
    // import TableActions from "@/views/components/TableHelpers/TableActions";
    import Loader from '@/views/components/Loader/Loader';
    import { driver } from "@/services/driver.service";
    // import {Category} from "../../services/Category.services";
    // import {Category as Food} from "../../services/Food.services";
// import { error } from 'util';

    
    export default {
        components: {Loader},
        name: "ListDrivers",
        data() {
            return {
                title: "Drivers",
                columnsHeader: ['ID', 'Avatar', 'Username', 'Email', 'Phone', 'Created', 'Status', 'Actions'],
                ads: [],
                contentData: {},
                isLoading: false,
                loadingText: 'loading',
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                bank_name: '',
                acc_number: '',
                acc_name:'',
                driving_license: '',
                password: '',
                user: this.$store.getters.GET_USER,
                data: []
            }
        },
        async created() {
        },

        methods: {
            genStr() {
                let text = "joolaDriverPassword"
                this.password = text;
                return text
            },
            async createUser(){
                this.loading = true;
                await driver.register({
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    phone: this.phone,
                    bank_name: this.bank_name,
                    acc_number: this.acc_number,
                    acc_name: this.acc_name,
                    password: this.password,
                    driving_license: this.driving_license
                }).then((response) => {
                    // this.fillDrivers(response);
                    
                    this.$toastr.success('Driver Created')
                    this.first_name = '',
                    this.last_name = '',
                    this.email = '',
                    this.phone = '',
                    this.bank_name = '',
                    this.acc_number = '',
                    this.acc_name = '',
                    this.password = '',
                    this.driving_license = ''
                }).catch((error)=> {
                    console.log(error)
                    this.$toastr.error(JSON.stringify(error.errors), "User Creation failed!", {timeOut: 5000});
                })
            }


        }
    }
</script>

<style lang="scss" scoped>

</style>