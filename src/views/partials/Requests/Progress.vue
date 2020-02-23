<template>
    <div>
       
        <div class="main-panel" slot="body">
            <Loader :loading-text="loadingText" :showFull=true v-if="isLoading"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Started Requests
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
                                                <template slot="actions" slot-scope="data">
                                                    <table-actions :actions=actions
                                                                   :data=data.item
                                                                   @view="view"
                                                                   ></table-actions>
                                                </template>
                                            </b-table>
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
</template>

<script>
    // import Layout from '../../components/Layout';
    import TableActions from "@/views/components/TableHelpers/TableActions";
    import Loader from '@/views/components/Loader/Loader';
    import {trip} from "@/services/trip.service";
    // import {Category as Food} from "../../services/Food.services";
// import { error } from 'util';

    const action = [
        {
            class: 'btn btn-primary btn-md',
            text: 'Option',
            title: "Option",
            dropdown: [
                {
                    args: ['ID'],
                    callback: 'view',
                    text: 'View',
                },
                {
                    args: ['uuid'],
                    callback: 'openEdit',
                    text: 'Edit',
                },
                {
                    args: ['uuid'],
                    callback: 'viewDetail',
                    text: 'Assign Driver',
                },
                {
                    args: ['uuid'],
                    callback: 'viewDetail',
                    text: 'Delete',
                }

                
            ]
        }
    ];
    export default {
        components: {Loader, TableActions},
        name: "ListCategory",
        data() {
            return {
                title: "ListCategories",
                actions: action,
                columnsHeader: ['ID','Customer ID', 'Username', 'Email', 'Location', 'Timestamp', 'Status', 'actions'],
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
            await this.fetchTrips();
        },
        watch: {
            perPage: {
                handler: function () {
                    this.currentPage = 1;
                    this.fetchTrips();
                }
            },
            currentPage: {
                handler: async function () {
                    await this.fetchTrips();
                }
            },
            filter: {
                handler: async function (value, oldVal) {
                    this.currentPage = 1;
                    if (value.length > 2) {
                        this.searchAds();
                    } else if (oldVal.length > 0 && value.length === 0) {
                        this.fetchTrips();
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
            fetchTrips() {
                this.loading = true;
                trip.getInProgress(this.perPage, this.currentPage).then((response) => {
                    this.fillTrip(response.data);
                }).catch(() => {
                });
            },
            fillTrip(data = []) {
                this.allContent = [];
                this.total = data.total;
                console.log(data.data)
                data.data.forEach(({status: status, user: user, destinations: destinations, trip_start: trip_start, id:id}) => {
                    this.allContent.push({
                        ID:id,
                        'Customer ID': user.uuid,
                        Username: user.first_name,
                        Email : user.email,
                        Location :destinations.address,
                        Timestamp: trip_start,
                        Status: status.status,
                    });
                });
                this.loading = false;
            },
            beforeOpen(event) {
                this.editData = event.params;
            },
            view(id){
                this.$router.push('requests/'+id)
            },
            openExtra(uuid) {
                this.catuuid = uuid;
                    this.$modal.show('addExtra');
            },
            openEdit(uuid){
                this.catuuid = uuid;
                this.getFood();
                this.$modal.show('editFood');
            },
            openPromo(){
                this.$modal.hide('viewFood');
                this.$modal.show('promo');
            },
            viewDetail(uuid) {
                this.catuuid = uuid;
                this.getFood();
                this.$modal.show('viewFood');
            },
        }
    }
</script>

