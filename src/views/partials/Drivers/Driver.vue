<template>
  <div>
    <!-- partial -->
    <div class="main-panel" slot="body">
      <Loader :loading-text="loadingText" :showFull="true" v-if="isLoading" />
      <div class="content-wrapper mb-5">
        <div class="page-header row">
          <h3 class="page-title ml-3">
            {{first_name}}
            <span :class="statusClass" class="small"> {{status}}</span>
          </h3>
          <div class="jo-btn-group ml-auto mr-3 mb-4">
              <b-button  class="btn jo-blue">Send Sms</b-button>
              <b-button  class="btn jo-blue">Send Email</b-button>
              <b-button @click="blockUser()"  class="btn jo-blue" >{{blocked == true ? 'Activate User': 'Block User'}}</b-button>

          </div>
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
                          <input
                            class="jo-input-dark"
                            type="text"
                            name="first_name"
                            v-model="first_name"
                            readonly
                          />
                        </div>
                        <div>
                          <label>Last Name</label>
                          <input
                            class="jo-input-dark"
                            type="text"
                            name="last_name"
                            v-model="last_name"
                            readonly
                          />
                        </div>
                        <div>
                          <label>Email</label>
                          <input
                            class="jo-input-dark"
                            type="text"
                            name="email"
                            v-model="email"
                            readonly
                          />
                        </div>
                        <div>
                          <label>Phone Number</label>
                          <input
                            class="jo-input-dark"
                            type="text"
                            v-model="phone"
                            readonly
                          />
                        </div>
                        <div>
                          <b-button @click="viewLocation">View Location History</b-button>
                          
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
import TableActions from "@/views/components/TableHelpers/TableActions";
import Loader from "@/views/components/Loader/Loader";
import { userService } from "@/services/user.service";

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
  name: "Driver",
  data() {
    return {
      title: "Request",
      contentData: {},
      actions: action,
      columnsHeader: ["ID", "Username", "Status", "actions"],
      currentPage: 1,
      status: "",
      statusClass: "",
      total: 0,
      perPage: 12,
      pageOptions: [6, 12, 18, 24, 36, 50],
      filter: "",
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      created_at: "",
      sortable: true,
      blocked: false,
      searchable: true,
      loading: true,
      allContent: [],
      isLoading: false,
      email: '',
      isPromo: false,
      loadingText: "loading",
      currentAd: "",
      currentAmount: 0,
      currentReference: "",
      user: this.$store.getters.GET_USER,
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
      userService
        .userDetails({ id: id })
        .then(response => {
          this.fillUser(response)
        })
        .catch(() => {});
    },
    assign() {
      this.$modal.show("getDrivers");
    },
    fillUser(response){
      this.first_name = response.data.first_name;
      this.last_name = response.data.last_name;
      this.email = response.data.email;
      this.phone = response.data.phone;
      this.status = response.data.status == 1? 'Active': 'Deactivated';
      this.statusClass = response.data.status == 1? 'jo-active': 'jo-disabled';
      this.blocked = response.data.status == 1? false: true;
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
    async blockUser(){
        var id = this.$route.params.id;
        await userService.blockUser({id: id}).then((res)=>{
          this.fillUser(res)
        }).catch((err)=>{

        })
    },
    viewLocation(){
        var id = this.$route.params.id;
        this.$router.push('/user/location/'+id)
    },
    async deleteTrip() {
      this.loading = true;
      var id = this.$route.params.id;
      await trip
        .deleteTrip({ id: id })
        .then(res => {
          this.$router.push("/requests");
        })
        .catch(err => {
          this.$toastr.error("Something Went Wrong");
        });
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
