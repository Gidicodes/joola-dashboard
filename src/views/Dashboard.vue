<template>
  <div class="animated fadeIn">
    <div>
      <label><b> Request Analytics</b></label>
      <b-row>
        <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                  <i class="icon-settings"></i>
                </template>
                
              </b-dropdown>
              <h4 class="mb-0">{{total_requests}}</h4>
              <p>Total Requests</p>
            </b-card-body>
            <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
          </b-card>
        </b-col>
        <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
                <template slot="button-content">
                  <i class="icon-location-pin"></i>
                </template>
                
              </b-dropdown>
              <h4 class="mb-0">{{pending_requests}}</h4>
              <p> Pending Requests</p>
            </b-card-body>
            <!-- <card-line2-chart-example chartId="card-chart-02" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
          </b-card>
        </b-col>
        <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                  <i class="icon-settings"></i>
                </template>
              </b-dropdown>
              <h4 class="mb-0">{{process_request}}</h4>
              <p>Processing Requests</p>
            </b-card-body>
            <!-- <card-line3-chart-example chartId="card-chart-03" class="chart-wrapper" style="height:70px;" height="70"/> -->
          </b-card>
        </b-col>
        <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                  <i class="icon-settings"></i>
                </template>
              </b-dropdown>
              <h4 class="mb-0">{{completed_requests}}</h4>
              <p>Completed Requests</p>
            </b-card-body>
            <!-- <card-line3-chart-example chartId="card-chart-03" class="chart-wrapper" style="height:70px;" height="70"/> -->
          </b-card>
        </b-col>
      </b-row>
    </div>
    
    <div>
      <label><b> Driver Analytics</b></label>
      <b-row>
        <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                  <i class="icon-settings"></i>
                </template>
                
              </b-dropdown>
              <h4 class="mb-0">{{drivers}}</h4>
              <p>Total Drivers</p>
            </b-card-body>
            <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
          </b-card>
        </b-col>
        <!-- <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
                <template slot="button-content">
                  <i class="icon-location-pin"></i>
                </template>
                
              </b-dropdown>
              <h4 class="mb-0">{{active_drivers}}</h4>
              <p> Active Drivers</p>
            </b-card-body>
          </b-card>
        </b-col> -->
        <!-- <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                  <i class="icon-settings"></i>
                </template>
              </b-dropdown>
              <h4 class="mb-0">{{in_active_drivers}}</h4>
              <p>In Active Drivers</p>
            </b-card-body>
          </b-card>
        </b-col> -->
      </b-row>
    </div>

    <div>
      <label> Customer Analytics</label>
      <b-row>
        <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                  <i class="icon-settings"></i>
                </template>
                
              </b-dropdown>
              <h4 class="mb-0">{{users}}</h4>
              <p>Total Customers</p>
            </b-card-body>
            <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
          </b-card>
        </b-col>
        <!-- <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
                <template slot="button-content">
                  <i class="icon-location-pin"></i>
                </template>
                
              </b-dropdown>
              <h4 class="mb-0">{{active_users}}</h4>
              <p> Active Customers</p>
            </b-card-body>
          </b-card>
        </b-col> -->
        <b-col sm="6" lg="4">
          <b-card no-body class="bg-outline">
            <b-card-body class="pb-0">
              <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                  <i class="icon-settings"></i>
                </template>
              </b-dropdown>
              <h4 class="mb-0">{{new_users}}+</h4>
              <p>New Customers</p>
            </b-card-body>
            <!-- <card-line3-chart-example chartId="card-chart-03" class="chart-wrapper" style="height:70px;" height="70"/> -->
          </b-card>
        </b-col>
      </b-row>
    </div>

  </div>
</template>

<script>
import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
import CardBarChartExample from './dashboard/CardBarChartExample'
import MainChartExample from './dashboard/MainChartExample'
import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
import CalloutChartExample from './dashboard/CalloutChartExample'
import { Callout } from '@coreui/vue'
import {report} from '@/services/dashboard.service';

export default {
  name: 'dashboard',
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample
  },
  data: function () {
    return {
      selected: 'Month',
      trucks: 0,
      total_requests:0,
      pending_requests: 0,
      process_request: 0,
      completed_requests: 0,
      total_drivers: 0,
      in_active_drivers: 0,
      active_drivers: 0,
      users: 0,
      new_users: 0,
      active_users: 0,
      in_active_users: 0,
    }
  },
  async created() {
      await this.getReport();
  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    },
    getReport(){
       this.loading = true;
        report.getAll().then((response) => {
          let data = response.data
          this.users = data.users;
          this.drivers = data.drivers;
          this.total_requests= data.all_trips;
          this.pending_requests = data.pending_trips;
          this.process_request = data.processing_trips;
          this.completed_requests = data.completed_trips;
          this.active_drivers = data.active_drivers;
          this.active_users = data.active_users;
          this.in_active_users = data.in_active_users;
          this.in_active_drivers = data.in_active_drivers;
          this.new_users = data.new_users;
        }).catch(()=> {
            this.$toastr.error('Something Went wrong')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
  .bg-outline{
    box-shadow: -10px 10px 30px rgba(30, 30, 30, 0.05) !important;
    border-radius: 20px;
    padding: 0.5rem 0.25rem;
  }
</style>
  
