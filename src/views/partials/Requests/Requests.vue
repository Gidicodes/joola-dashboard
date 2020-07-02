<template>
  <div>
    <div slot="head">
      <!-- Vood food -->
      <modal :height="700" @before-open="beforeOpen" name="getDrivers">
        <div class="modal-header">Assign Driver</div>
        <div class="modal-body">
          <div>
            <label>Set Trip Amount</label>
            <div class="jo-form">
              <label class="big-label">₦</label>
              <input type="number" v-model="price" class="jo-input-dark" />
            </div>
          </div>
          <div class="col-12 table-responsive">
            <b-table
              :busy="loading"
              :fields="customHeader"
              :items="drivers"
              :per-page="12"
              show-empty
            >
              <div class="text-center text-primary my-2" slot="table-busy">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>

              <template slot="actions" slot-scope="data">
                <b-button
                  class="btn btn-success"
                  :data="data.item"
                  @click="assignUser(data.item.id)"
                >Assign</b-button>
              </template>
            </b-table>
            <b-pagination :per-page="perPage" :total-rows="total" size="sm" v-model="currentPage"></b-pagination>
            <!-- </div> -->
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
            Requests
          </h3>
          <div class="jo-flow">
            <b-button class="btn jo-blue btn-md ml-3" to="/started">
              <span>Assigned Reqests</span>
            </b-button>
            <b-button class="btn btn-warning btn-md ml-3">
              <span>In Progress</span>
            </b-button>
            <b-button class="btn btn-success btn- ml-3">
              <span>Completed Trips</span>
            </b-button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 grid-margin stretch-card">
            <b-row md="12">
              <b-col class="col-m2-4"></b-col>
              <b-col class="jo-options" md="3">
                <span>Show</span>
                <b-form-select :options="pageOptions" class="form-control" v-model="perPage"></b-form-select>
              </b-col>
            </b-row>
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-12 table-responsive table-striped">
                    <div class="mb-lg-5"></div>
                    <b-table
                      :busy="loading"
                      :current-page="currentPage"
                      :fields="columnsHeader"
                      :items="allContent"
                      :per-page="0"
                      show-empty
                    >
                      <div class="text-center text-primary my-2" slot="table-busy">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                      </div>
                      <template slot="actions" slot-scope="data">
                        <table-actions :actions="actions" :data="data.item"
                        @view="view" @viewDetail="detail"></table-actions>
                      </template>
                    </b-table>
                    <div class="jo-flex">
                      <div class="mt-2">Showing: {{ perPage }} of {{ total }} results</div>
                      <div class>
                        <b-pagination
                          :per-page="perPage"
                          :total-rows="total"
                          size="md"
                          class="jo-paginate"
                          v-model="currentPage"
                        ></b-pagination>
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
import TableActions from '@/views/components/TableHelpers/TableActions';
import Loader from '@/views/components/Loader/Loader';
import { trip } from '@/services/trip.service';
import { driver } from '@/services/driver.service';


const action = [
  {
    class: 'jo-action',
    text: '...',
    title: '...',
    dropdown: [
      {
        args: ['id'],
        callback: 'view',
        text: 'View',
      },
      {
        args: ['id'],
        callback: 'viewDetail',
        text: 'Assign Driver',
      },
      {
        args: ['id'],
        callback: 'deleteTrip',
        text: 'Delete',
      },
    ],
  },
];
export default {
  components: { Loader, TableActions },
  name: 'RequestList',
  data() {
    return {
      title: 'Requests',
      actions: action,
      columnsHeader: [
        'ID',
        'Username',
        'Email',
        'Phone',
        'Location',
        'Timestamp',
        'Status',
        'actions',
      ],
      customHeader: ['ID', 'Username', 'Phone', 'Status', 'actions'],
      contentData: {},
      currentPage: 1,
      total: 0,
      perPage: 12,
      pageOptions: [6, 12, 18, 24, 36, 50],
      filter: '',
      sortable: true,
      searchable: true,
      loading: true,
      drivers: [],
      allContent: [],
      isLoading: false,
      isPromo: false,
      loadingText: 'loading',
      currentAd: '',
      currentAmount: 0,
      currentRequest: {},
      user: this.$store.getters.GET_USER,
      extra_price: 0,
      extra_name: '',
      catuuid: '',
      data: [],
      price: 0,
      trip_id: '',
    };
  },
  async created() {
    await this.fetchTrips();
  },
  watch: {
    perPage: {
      handler: function() {
        this.currentPage = 1;
        this.fetchTrips();
      },
    },
    currentPage: {
      handler: async function() {
        await this.fetchTrips();
      },
    },
    filter: {
      handler: async function(value, oldVal) {
        this.currentPage = 1;
        if (value.length > 2) {
          this.searchAds();
        } else if (oldVal.length > 0 && value.length === 0) {
          this.fetchTrips();
        }
      },
    },
    isLoading: {
      handler(value) {
        if (!value) {
          this.loadingText = '';
        }
      },
    },
  },
  methods: {
    fetchTrips() {
      this.loading = true;
      trip
        .getAll(this.perPage, this.currentPage)
        .then(response => {
          this.fillTrip(response.data);
        })
        .catch(() => {});
    },
    fillTrip(data = []) {
      this.allContent = [];
      this.total = data.total;
      let count = 0;
      data.data.forEach(
        ({
          status: status,
          user: user,
          destinations: destinations,
          created_at: created_at,
          id: id,
        }) => {
          this.allContent.push({
            id: id,
            ID: count += 1,
            Phone: user.phone,
            Username: user.first_name,
            Email: user.email,
            Location: destinations.address,
            Timestamp: created_at,
            Status: status.status,
          });
        },
      );
      this.loading = false;
    },
    async beforeOpen(event) {
      this.editData = event.params;
      this.loading = true;
      await driver
        .activeDrivers()
        .then(response => {
          this.fillDrivers(response);
        })
        .catch(error => {})
    },
    fillDrivers(data = []) {
      this.drivers = [];
      let d = 0;
      data.data.forEach(
        ({
          first_name: first_name,
          last_name: last_name,
          uuid: uuid,
          phone: phone,
          status: status,
        }) => {
          this.drivers.push({
            id: uuid,
            Username: first_name + ' ' + last_name,
            Status: status == 1 ? 'Active' : 'Deactivated',
            Phone: phone,
            ID: d += 1,
          });
        },
      );
      this.loading = false;
    },
    view(id) {
      this.$router.push('requests/' + id);
    },
    detail(id) {
      this.trip_id = id;
      this.$modal.show('getDrivers');
    },
    async deleteTrip() {
      this.loading = true;
      var id = this.trip_id;
      await trip
        .deleteTrip({ id: id })
        .then(res => {
          this.$router.push('/requests');
        })
        .catch(err => {
          this.$toastr.error('Something Went Wrong');
        });
    },
    async assignUser(driver) {
      var id = this.trip_id;
      if (this.price === 0) {
        this.$toastr.error('Price of Trip Needed', { timeOut: 5000 });
        return;
      }
      this.loading = true;

      await trip
        .assignDriver({ id: id, driver: driver, amount:this.price})
        .then(response => {
          this.$toastr.success('Successful', { timeOut: 5000 });
          this.$modal.hide('getDrivers');
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.food-banner {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: auto;
  display: block;
}
</style>
