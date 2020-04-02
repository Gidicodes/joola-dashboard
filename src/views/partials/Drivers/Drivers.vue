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
                        Drivers
                    </h3>
                    <div class="jo-flow">
                        <b-button  class=" btn jo-blue btn-md" to="/driver/create"><span>Add Driver</span></b-button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <b-row md="12">
                            <b-col class="col-m2-4"></b-col>

                            <b-col class="jo-options" md="3">
                                <span>Show</span>
                                <b-form-select :options="pageOptions"
                                                class="form-control"
                                                v-model="perPage"></b-form-select>
                            </b-col>
                        </b-row>
                        <div class="card">
                            <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 table-responsive table-striped">
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
                                            <div class="jo-flex">
                                                <div class="mt-2" >Showing: {{ perPage }} of {{ total }} results</div>
                                            <div class="">
                                            <b-pagination :per-page="perPage" :total-rows="total" size="md" class="jo-paginate"
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
    import { driver } from "@/services/driver.service";
    // import {Category} from "../../services/Category.services";
    // import {Category as Food} from "../../services/Food.services";
// import { error } from 'util';

    const action = [
        {
            class: 'jo-action',
            text: '...',
            title: "...",
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
                    callback: 'openExtra',
                    text: 'Block',
                }
                
            ]
        }
    ];
    export default {
        components: {Loader, TableActions},
        name: "ListDrivers",
        data() {
            return {
                title: "Drivers",
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
            await this.fetchDrivers();
        },
        watch: {
            perPage: {
                handler: function () {
                    this.currentPage = 1;
                    this.fetchDrivers();
                }
            },
            currentPage: {
                handler: async function () {
                    await this.fetchDrivers();
                }
            },
            filter: {
                handler: async function (value, oldVal) {
                    this.currentPage = 1;
                    if (value.length > 2) {
                        this.searchAds();
                    } else if (oldVal.length > 0 && value.length === 0) {
                        this.fetchDrivers();
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
            fetchDrivers() {
                this.loading = true;
                driver.getDrivers().then((response) => {
                    this.fillDrivers(response);
                }).catch(()=> {
                    $this.toastr.error('Something Went wrong')
                })
            },
            fillDrivers(data = []) {
                this.allContent = [];
                this.total = data.data.length
                data.data.forEach(({image_url: image_url, first_name: first_name, last_name:last_name,  uuid: uuid, phone: phone, status: status, email: email, created_at: created_at}) => {
                    this.allContent.push({
                        Avatar: '<img src="' + image_url + '"/>',
                        Username: first_name + ' '+ last_name,
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
                this.$router.push('drivers/'+id)
            }
        }
    }
</script>
<style lang="scss" scoped>
.ml-auto{
    margin-left:auto;
}


</style>
