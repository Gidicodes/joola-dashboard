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
                        Customers
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
                                    <b-row>
                                        <b-col class="float-left" md="3">
                                            Choose entries
                                            <b-form-select :options="pageOptions"
                                                           class="form-control"
                                                           v-model="perPage"></b-form-select>
                                        </b-col>
                                        <b-col class="col-m2-4"></b-col>
                                    </b-row>
                                    <div class="row">
                                        <div class="col-12 table-responsive">
                                            <div class="mb-lg-5"></div>
                                            <b-table :busy="loading" :current-page="currentPage"
                                                     :fields="columnsHeader"
                                                     :items="allContent"
                                                     :per-page="0"
                                                     show-empty>
                                                <div class="text-center text-primary my-2" slot="table-busy">
                                                    <b-spinner class="align-middle"></b-spinner>
                                                    <strong>Loading...</strong>
                                                </div>
                                                <span slot="Avatar" slot-scope="data" v-html="data.item.Avatar"></span>
                                                
                                                <template slot="Actions" slot-scope="data">
                                                    
                                                    <table-actions :actions=actions
                                                                   :data=data.item
                                                                   @viewUser=viewUser
                                                                  ></table-actions>
                                                </template>
                                            </b-table>
                                            <div class="float-left mt-2" >Page: {{ currentPage }} of {{Math.ceil(total/perPage) > 0 ? Math.ceil(total/perPage) : 1}}</div>
                                            <div class="float-right">
                                            <b-pagination :per-page="perPage" :total-rows="total" size="md"
                                                          v-model="currentPage"></b-pagination>
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
    import TableActions from "@/views/components/TableHelpers/TableActions";
    import Loader from '@/views/components/Loader/Loader';
    import { customer } from "@/services/customer.service";
    // import {Category} from "../../services/Category.services";
    // import {Category as Food} from "../../services/Food.services";
// import { error } from 'util';

    const action = [
        {
            class: 'btn btn-primary btn-md',
            text: 'Options',
            title: "Options",
            dropdown: [
                {
                    args: ['ID'],
                    callback: 'viewUser',
                    text: 'View',
                },
                // {
                //     args: ['ID'],
                //     callback: 'openExtra',
                //     text: 'Edit',
                // },
                {
                    args: ['ID'],
                    callback: 'blockUser',
                    text: 'Block',
                }
                
            ]
        }
    ];
    export default {
        components: {Loader, TableActions},
        name: "ListCustomers",
        data() {
            return {
                title: "Customers",
                actions: action,
                columnsHeader: ['ID', 'Avatar', 'Username', 'Email', 'Phone', 'Created', 'Status', 'Actions'],
                ads: [],
                contentData: {},
                currentPage: 1,
                total: 0,
                perPage: 12,
                pageOptions: [6, 12, 18, 24, 36, 50],
                filter: '',
                sortable: true,
                searchable: true,
                loading: true,
                allContent: [],
                isLoading: false,
                isPromo: false,
                loadingText: 'loading',
                currentAd: '',
                currentAmount: 0,
                currentReference: '',
                user: this.$store.getters.GET_USER,
                extra_price: 0,
                extra_name: '',
                catuuid: '',
                data: [],
                discount: 0
            }
        },
        async created() {
            await this.fetchCustomers();
        },
        watch: {
            perPage: {
                handler: function () {
                    this.currentPage = 1;
                    this.fetchCustomers();
                }
            },
            currentPage: {
                handler: async function () {
                    await this.fetchCustomers();
                }
            },
            filter: {
                handler: async function (value, oldVal) {
                    this.currentPage = 1;
                    if (value.length > 2) {
                        this.searchAds();
                    } else if (oldVal.length > 0 && value.length === 0) {
                        this.fetchCustomers();
                    }
                }
            },
            isLoading: {
                handler(value) {
                    if (!value) {
                        this.loadingText = '';
                    }
                }
            }
        },

        methods: {
            fetchCustomers() {
                this.loading = true;
                customer.getAll().then((response) => {
                    this.fillCustomers(response);
                }).catch(()=> {
                    this.$toastr.error('Something Went wrong')
                })
            },
            fillCustomers(data = []) {
                this.allContent = [];
                data.data.forEach(({image_url: image_url, first_name: first_name, uuid: uuid, phone: phone, status: status, email: email, created_at: created_at}) => {
                    this.allContent.push({
                        Avatar: '<img src="' + image_url + '"/>',
                        Username: first_name,
                        Phone: phone,
                        Status: status == 1 ? 'Active' :'Deactivated',
                        Email : email,
                        ID: uuid,
                        Created: created_at
                    });
                });
                this.loading = false;
            },
            beforeOpen(event) {
                this.editData = event.params;
            },
            viewUser(id){
                this.$router.push('users/'+id)
            }
            
            
        }
    }
</script>

