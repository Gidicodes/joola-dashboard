<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        :src="user"
        class="sm-img-avatar"
        alt="user" />
    </template>
    <template slot="dropdown">
      <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <b-dropdown-item @click="logout()"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import {mapActions} from 'vuex';
import router from '../router';

export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  computed: {
    user: {
      get(){
        const url = this.$store.getters.GET_USER.avatar_url;
        return  url != null ? url: 'img/avatars/6.jpg';
      }
    }
  },
  methods :{
    ...mapActions({loggedout: 'UNSET_USER'}),
  async logout() {
      this.loading = true;
      await this.loggedout().then((res)=> {
        router.push('/login')
      });
  }
  
  }
}
</script>
