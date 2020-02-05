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
                                                <span slot="Icon" slot-scope="data" v-html="data.item.Icon"></span>
                                                <template slot="actions" slot-scope="data">
                                                    <table-actions :actions=actions
                                                                   :data=data.item
                                                                   @openExtra="openExtra"
                                                                   @openEdit="openEdit"
                                                                   @viewDetail="viewDetail"></table-actions>
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
                    args: ['uuid'],
                    callback: 'openExtra',
                    text: 'Add Extra',
                },
                {
                    args: ['uuid'],
                    callback: 'openEdit',
                    text: 'Edit Food',
                },
                {
                    args: ['uuid'],
                    callback: 'viewDetail',
                    text: 'View Food',
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
                columnsHeader: ['Customer ID', 'UserName', 'Customer Email', 'Location', 'Timestamp', 'Status'],
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
            await this.fetchCategories();
        },
        watch: {
            perPage: {
                handler: function () {
                    this.currentPage = 1;
                    this.fetchCategories();
                }
            },
            currentPage: {
                handler: async function () {
                    await this.fetchCategories();
                }
            },
            filter: {
                handler: async function (value, oldVal) {
                    this.currentPage = 1;
                    if (value.length > 2) {
                        this.searchAds();
                    } else if (oldVal.length > 0 && value.length === 0) {
                        this.fetchCategories();
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
            fetchCategories() {
                this.loading = true;
                Food.listFood(this.perPage, this.currentPage).then((response) => {
                    this.fillCategory(response);
                }).catch(() => {
                });
            },
            fillCategory(data = []) {
                this.allContent = [];
                this.total = data.total;
                data.data.forEach(({image_url: image_url, name: name, uuid: uuid, description: description, price: price}) => {
                    this.allContent.push({
                        Icon: '<img src="' + image_url + '"/>',
                        Name: name,
                        Description: description,
                        Price: price,
                        uuid: uuid
                    });
                });
                this.loading = false;
            },
            beforeOpen(event) {
                this.editData = event.params;
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
