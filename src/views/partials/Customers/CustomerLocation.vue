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
                        Customer Location History
                    </h3>
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
    import { userService } from "@/services/user.service";
    // import {Category} from "../../services/Category.services";
    // import {Category as Food} from "../../services/Food.services";
// import { error } from 'util';

    
    export default {
        components: {Loader, TableActions},
        name: "ListCustomers",
        data() {
            return {
                title: "Customers",
                columnsHeader: ['ID', 'Address', 'Latitude', 'Longitude', 'Created'],
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
            await this.fetchLocations();
        },
        watch: {
            perPage: {
                handler: function () {
                    this.currentPage = 1;
                    this.fetchLocations();
                }
            },
            currentPage: {
                handler: async function () {
                    await this.fetchLocations();
                }
            },
            filter: {
                handler: async function (value, oldVal) {
                    this.currentPage = 1;
                    if (value.length > 2) {
                        this.searchAds();
                    } else if (oldVal.length > 0 && value.length === 0) {
                        this.fetchLocations();
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
            fetchLocations() {
                this.loading = true;
                var id = this.$route.params.id;
                userService.getLocations({id:id}).then((response) => {
                    this.fillLocations(response);
                }).catch(()=> {
                    this.$toastr.error('Something Went wrong')
                })
            },
            fillLocations(data = []) {
                this.allContent = [];
                data.data.forEach(({address: address, id: id, lat: lat, lon: lon, created_at: created_at}) => {
                    this.allContent.push({
                        Address: address,
                        Latitude: lat,
                        Longitude: lon,
                        ID: id,
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

