<template>
  <div>
    <div slot="head">
      <modal :height="700" @before-open="beforeOpen" name="getDrivers">
        <div class="modal-header">Assign Driver</div>
        <div class="modal-dialog" role="document">
          <div class="modal-body">
            <div class="modal-content" style="background-color:#FFF">
              <div class="row">
                <div class="col-12 table-responsive">
                  <b-table
                    :busy="loading"
                    :current-page="currentPage"
                    :fields="columnsHeader"
                    :items="allContent"
                    :per-page="0"
                    show-empty
                  >
                    <div
                      class="text-center text-primary my-2"
                      slot="table-busy"
                    >
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>Loading...</strong>
                    </div>

                    <template slot="actions" slot-scope="data">
                      <b-button
                        class="btn btn-success"
                        :data="data.item"
                        @click="assignUser(data.item.ID)"
                        >Assign</b-button
                      >
                    </template>
                  </b-table>
                  <b-pagination
                    :per-page="perPage"
                    :total-rows="total"
                    size="sm"
                    v-model="currentPage"
                  ></b-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>
    <!-- partial -->
    <div class="main-panel" slot="body">
      <Loader :loading-text="loadingText" :showFull="true" v-if="isLoading" />
      <div class="content-wrapper">
        <div class="page-header">
          <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
              <i class="mdi mdi-account-card-details"></i>
            </span>
            Request
          </h3>
        </div>
        <div class="row">
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="card-body">
                  <div class="row">
                    <h4 class="card-title">Trip Request</h4>
                  </div>

                  <div class="row my-3">
                    <div class="col">
                      <label>User</label>
                    </div>
                    <div class="col">
                      <router-link :to="user_id"><span>{{ first_name }} {{ last_name }}</span></router-link>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col">
                      <label>Address</label>
                    </div>
                    <div class="col">
                      <span>{{ address }}</span>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col">
                      <label>Request Time</label>
                    </div>
                    <div class="col">
                      <span>{{ created_at }}</span>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col">
                      <label>Status</label>
                    </div>
                    <div class="col">
                      <span>{{ status }}</span>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col">
                      <label>Driver</label>
                    </div>
                    <div class="col">
                      <router-link :to="driver_id"><span >{{ driver }}</span></router-link>
                    </div>
                  </div>
                  <div class="row my-5">
                    <div class="col"></div>
                    <div class="col">
                      <button class="btn btn-success mr-2" @click="assign">
                        Assign Driver
                        <i
                          class="mdi mdi-account-edit mdi-18px float-left text-color"
                        ></i>
                      </button>
                      <button class="btn btn-danger" @click="deleteTrip">
                        Delete Trip Request
                        <i
                          class="mdi mdi-account-edit mdi-18px float-left text-color"
                        ></i>
                      </button>
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
import Loader from "@/views/components/Loader/Loader";
import { trip } from "@/services/trip.service";
import { driver } from "@/services/driver.service";

const action = [
  {
    class: "btn btn-primary btn-md",
    args: ["ID"],
    callback: "assign",
    text: "Assign"
  }
];

export default {
  components: { Loader, TableActions },
  name: "ListCategory",
  data() {
    return {
      title: "Request",
      contentData: {},
      actions: action,
      columnsHeader: ["ID", "Username", "Status", "actions"],
      currentPage: 1,
      status: "",
      total: 0,
      perPage: 12,
      pageOptions: [6, 12, 18, 24, 36, 50],
      filter: "",
      first_name: "",
      last_name: "",
      address: "",
      driver: null,
      driver_id:'',
      user_id: '',
      created_at: "",
      sortable: true,
      searchable: true,
      loading: true,
      allContent: [],
      isLoading: false,
      isPromo: false,
      loadingText: "loading",
      currentAd: "",
      currentAmount: 0,
      currentReference: "",
      user: this.$store.getters.GET_USER,
      extra_price: 0,
      extra_name: "",
      catuuid: "",
      data: [],
      discount: 0
    };
  },
  async created() {
    await this.fetchTrip();
  },
  watch: {
    isLoading: {
      handler(value) {
        if (!value) {
          this.loadingText = "";
        }
      }
    }
  },

  methods: {
    fetchTrip() {
      this.loading = true;
      var id = this.$route.params.id;
      trip
        .getTrip({ id: id })
        .then(response => {
          this.first_name = response.data.user.first_name;
          this.last_name = response.data.user.last_name;
          this.address = response.data.destinations.address;
          this.user_id = "/users/"+response.data.user.uuid
          this.created_at = response.data.created_at;
          this.status = response.data.status.status;
          this.driver = response.data.driver !== null ? response.data.driver.first_name +' '+ response.data.driver.last_name : null
          this.driver_id = response.data.driver !== null ? "/drivers/"+response.data.driver.uuid : null
          
        })
        .catch(() => {});
    },
    assign() {
      this.$modal.show("getDrivers");
    },
    async beforeOpen() {
      this.editData = event.params;
      this.loading = true;
      await driver
        .activeDrivers()
        .then(response => {
          this.fillDrivers(response);
        })
        .catch(error => {});
    },
    fillDrivers(data = []) {
      this.allContent = [];
      data.data.forEach(
        ({
          first_name: first_name,
          last_name: last_name,
          uuid: uuid,
          status: status
        }) => {
          this.allContent.push({
            Username: first_name + " " + last_name,
            Status: status == 1 ? "Active" : "Deactivated",
            ID: uuid
          });
        }
      );

      console.log(this.allContent);
      this.loading = false;
    },

    async deleteTrip(){
      this.loading= true;
      var id = this.$route.params.id;
      await trip.deleteTrip({id:id}).then((res)=>{
        this.$router.push('/requests')
      }).catch((err) => {
        this.$toastr.error('Something Went Wrong')
      })
    },
    async assignUser(driver) {
      this.loading = true;
      var id = this.$route.params.id;
      await trip
        .assignDriver({ id: id, driver: driver })
        .then(response => {
          this.$toastr.success("Successful", { timeOut: 5000 });
          this.$modal.hide("getDrivers");
          this.fetchTrip();
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
