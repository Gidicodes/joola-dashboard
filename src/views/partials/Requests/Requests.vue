<template>
    <div>
        <div slot="head">
            <modal :height="700" @before-open="beforeOpen" name="addExtra">
                <div class="modal-header">
                    Add Extra
                </div>
                <div class="modal-dialog" role="document">
                    <form @submit.prevent="addExtra()">
                        <div class="modal-content" style="background-color:#FFF">
                            <div class="modal-body mx-3">
                                <div class="md-form mb-5 form-space">

                                    <label data-error="wrong" data-success="right">Name</label>


                                    <input class="form-control validate form-input" ref="contents" type="text"
                                           v-model="extra_name">
                                </div>
                                <div class="md-form mb-5">
                                    <label data-error="wrong" data-success="right">Food Price</label>
                                    <input class="form-control validate form-input" ref="periods" type="text"
                                           v-model="extra_price">
                                </div>


                            </div>
                            <div class="modal-footer d-flex justify-content-center">

                                <button class="btn btn-primary">Add Extra
                                    <i class="mdi mdi-account-edit mdi-18px float-left text-color"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <!-- <button @click="closeEditEvent" class="btn btn-primary mx-auto">Close</button> -->
                </div>
            </modal>

            <!-- edit food -->
            <modal :height="700" @before-open="beforeOpen" name="editFood">
                <div class="modal-header">
                    Edit Food
                </div>
                <div class="modal-dialog" role="document">
                    <form @submit.prevent="updateFood()">
                        <div class="modal-content" style="background-color:#FFF">
                            <div class="modal-body mx-3">
                                <div class="md-form mb-5 form-space">

                                    <label data-error="wrong" data-success="right">Name</label>


                                    <input class="form-control validate form-input" ref="contents" type="text"
                                           v-model="extra_name">
                                </div>
                                <div class="md-form mb-5">
                                    <label data-error="wrong" data-success="right">Food Price</label>
                                    <input class="form-control validate form-input" ref="periods" type="text"
                                           v-model="extra_price">
                                </div>


                            </div>
                            <div class="modal-footer d-flex justify-content-center">

                                <button class="btn btn-primary">Add Extra
                                    <i class="mdi mdi-account-edit mdi-18px float-left text-color"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <!-- <button @click="closeEditEvent" class="btn btn-primary mx-auto">Close</button> -->
                </div>
            </modal>

            <modal :height="400" @before-open="beforeOpen" name="promo">
                <div class="modal-header">
                    Promo
                </div>
                <div class="modal-dialog" role="document">
                    <form @submit.prevent="tagFood()">
                        <div class="modal-content" style="background-color:#FFF">
                            <div class="modal-body mx-3">
                                <div class="md-form mb-5 form-space">

                                    <label data-error="wrong" data-success="right">Discount Price</label>


                                    <input class="form-control validate form-input" ref="contents" type="text"
                                           v-model="discount">
                                </div>
                                

                            </div>
                            <div class="modal-footer d-flex justify-content-center">

                                <button class="btn btn-success">Tag Food as Promo
                                    <i class="mdi mdi-account-edit mdi-18px float-left text-color"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <!-- <button @click="closeEditEvent" class="btn btn-primary mx-auto">Close</button> -->
                </div>
            </modal>

             <!-- Vood food -->
            <modal :height="700" @before-open="beforeOpen" name="viewFood">
                <div class="modal-header">
                    View Food
                </div>
                <div class="modal-dialog" role="document">
                    
                        <div class="modal-content" style="background-color:#FFF">
                            <div class="modal-body mx-3">
                                <img :src="data.image_url" alt="" class="food-banner">
                                <div class="md-form mb-3 form-space">
                                    <label> Food Details</label>
                                    <div class="input-group">
                                        <label class="form-control">Name : {{data.name}}</label>
                                        <label class="form-control">Price : {{data.price}} </label>
                                    </div>
                                     <div class="input-group">
                                        <label class="form-control">Description : {{data.description}}</label>
                                        <label class="form-control">Category : {{data.category_name }} </label>
                                    </div>
                                    <div class="input-group">
                                        <label class="form-control">Promo : {{data.status}}</label>
                                        <label class="form-control">Discount Price : {{data.discount_price}} </label>
                                    </div>
                                </div>

                                <div class="md-form mb-3 form-space">
                                    <label> Food Extra</label>
                                    <div class="input-group" v-for="(order, index) in data.extra" :key="index">
                                        <label class="form-control">Name : {{order.name}} </label>
                                        <label class="form-control">Price : {{order.price}} </label>
                                    </div>
                                </div>


                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <form @submit.prevent="openPromo()">
                                <button class="btn btn-success">Tag as Promo
                                    <i class="mdi mdi-account-edit mdi-18px float-left text-color"></i>
                                </button>
                                </form>
                                <form @submit.prevent="deleteFood(data.uuid)">
                                 <button class="btn btn-danger">Delete
                                    <i class="mdi mdi-account-edit mdi-18px float-left text-color"></i>
                                </button>
                                </form>
                            </div>
                        </div>
                    
                </div>

                <div class="modal-footer">
                    <!-- <button @click="closeEditEvent" class="btn btn-primary mx-auto">Close</button> -->
                </div>
            </modal>
        </div>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader :loading-text="loadingText" :showFull=true v-if="isLoading"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Requests
                    </h3>
                    <div class="jo-flow">
                        <b-button  class=" btn jo-blue btn-md ml-3" to="/started"><span>Assigned Reqests</span></b-button>
                        <b-button  class=" btn btn-warning btn-md ml-3" ><span>In Progress</span></b-button>
                        <b-button  class=" btn btn-success btn- ml-3" ><span>Completed Trips</span></b-button>

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
                                                <template slot="actions" slot-scope="data">
                                                    <table-actions :actions=actions
                                                                   :data=data.item
                                                                   @view="view"
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
    import {trip} from "@/services/trip.service";
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
                trip.getAll(this.perPage, this.currentPage).then((response) => {
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
            async addExtra(uuid) {
                this.isLoading = true;
                let data = {
                    food_uuid: this.catuuid,
                    name: this.extra_name,
                    price: this.extra_price
                };
                await Food.addExtra(data).then((res) => {
                    this.extra_name = '';
                    this.extra_price = '';
                    this.$toastr.success(res.message, {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.error.message, "Update Ads Content Creation failed!", {timeOut: 5000});
                });
                this.isLoading = false;
            },
            async getFood(uuid){
                this.isLoading = true;
                await Food.foodDetail(this.catuuid).then((res)=> {
                    let data = res.data;
                    this.data = {
                        ...data,
                        'category_name' : data.category.name
                    }
                }).catch((error) => {

                })
                this.isLoading = false;
            },
            async deleteFood(uuid){
                this.isLoading = true;
                await Food.deleteFood(this.catuuid).then((res)=> {
                    this.data = [];
                    this.$toastr.success(res.message, {timeOut: 5000});
                    this.$modal.hide('viewFood');
                }).catch((error)=> {

                })
                this.isLoading=false
            },
            async tagFood(uuid){
                this.isLoading = true;
                if (this.discount != 0){
                    let data = {
                        'discount' : this.discount
                    }
                    await Food.tagFood(this.catuuid, data).then((res)=> {
                    this.data = [];
                    this.$toastr.success(res.message, {timeOut: 5000});
                    this.$modal.hide('viewFood');
                }).catch((error)=> {

                })
                this.isLoading=false
                }
                
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

<style scoped>
.food-banner{
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin:auto;
    display: block;
}
</style>
