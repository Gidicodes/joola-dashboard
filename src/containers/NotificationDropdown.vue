<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="icon-bell"></i>
      <b-badge pill variant="danger">{{ Object.keys(this.notifications).length }}</b-badge>
    </template>
    <template slot="dropdown">
      <div class="jo-notification-dropdown">
        <b-dropdown-item>Notifications</b-dropdown-item>
        <b-dropdown-item
          v-for="(notification, index) in notifications"
          @click="notify(notification.data.data.id)"
          :key="index"
        >
          <i class="fa fa-bell-o" />
          <div class="jo-flex">
            <div>
                <p>{{notification.data.message}}</p>
                <span> New order request at </span>
            </div>
            <span>{{humanFormat(notification.data.data.created_at)}}</span>
          </div>
        </b-dropdown-item>
        <!-- <b-button variant="primary" class="btn-block">Mark all as read</b-button> -->
      </div>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import moment from "moment";
export default {
  name: "NotificationDropdown",
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return {
      notifications: []
    };
  },
  mounted() {
    this.getNotification();
  },
  methods: {
    getNotification() {
      this.notifications = this.$store.getters.GET_NOTIFICATION;
      console.log(this.notifications);
    },

    notify(id) {
      this.$router.push("/requests/" + id);
    },
    humanFormat(date) {
      return moment(date).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
.jo-flex{
    width: 100%;
    p{
        font-size:14px;
        margin: 2px 0px;
        font-weight: bold;
    }
    span{
        font-size: 11px;
        color:#6F6F6F;
    }
}
</style>
