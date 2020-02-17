<template>
    <AppHeaderDropdown no-caret>
          <template slot="header">
             <i class="icon-bell"></i>
            <b-badge pill variant="danger">{{ Object.keys(this.notifications).length }}</b-badge>
          </template>\
          <template slot="dropdown">
            <b-dropdown-header tag="div" class="text-center"><strong>Notifications</strong></b-dropdown-header>
            <b-dropdown-item v-for="(notification, index) in notifications" @click="notify(notification.data.data.id)" :key="index" >
                <i class="fa fa-bell-o" /> {{notification.data.message}}
            </b-dropdown-item>
                <b-button variant="primary" class="btn-block">Mark all as read</b-button>
          </template>
           
        </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'

export default {
    name: "NotificationDropdown",
    components:{
        AppHeaderDropdown

    },
    data: () => {
        return {
            'notifications': [],
        }
    },
    mounted(){
        this.getNotification()


    },
    methods:{
        getNotification(){
        this.notifications = this.$store.getters.GET_NOTIFICATION
        },
        notify(id){
            this.$router.push('/requests/'+id);
        }

    }
}
</script>