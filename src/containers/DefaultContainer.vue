<template>
  <div class="app">
    <DefaultHeader/>
    <div class="app-body">
      <AppSidebar class="cus-sidebar" fixed>
        <SidebarHeader />
        <SidebarForm/>
        <SidebarNav  :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <!-- <Breadcrumb :list="list"/> -->
        <div class="container-fluid mt-4">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <DefaultFooter/>
  </div>
</template>

<script>
import nav from '@/_nav1'
import { Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import Route from '../router';
import { mapActions } from "vuex";




export default {
  name: 'DefaultContainer',
  components: {
    AppSidebar,
    AppAside,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    DefaultFooter,
    DefaultHeader
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  },

  async mounted() {
      // Verify the User token is still valid
      let loginValid = await this.$store.dispatch('AUTHORISE_USER', this.$store.getters.GET_AUTH_TOKEN);
      // If login is not valid
      if (!loginValid) {
          this.$store.dispatch("UNSET_USER");
          Route.push({name: 'login'});
      }

      this.$echo.channel('new-trip').listen('.trip.created', (payload) => {
          this.$toastr.success('Click this button to <a href="requests/'+payload.data.id +'" class="btn btn-toast">View</a>' , 'New Trip Request', {onclick: null});
          this.getNotification()
      })
      this.getNotification()
  },
  methods: {
      ...mapActions({ notification: "GetNotification" }),
      async getNotification() {
        this.loading = true;
        await this.notification().then((res)=> {
          
        }).catch((error)=> {
        })
      }
  }
    
}
</script>
