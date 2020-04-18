<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'app',
  async mounted() {
    // Verify the User token is still valid
    let loginValid = await this.$store.dispatch(
      'AUTHORISE_USER',
      this.$store.getters.GET_AUTH_TOKEN,
    );
    if (!loginValid) {
      this.$store.dispatch('UNSET_USER');
      Route.push({ name: 'login' });
    }
    let user = this.$store.getters.GET_USER;
    // this.$echo.private('private-user-chat-'+user.id).listen('NewUserChatEvent', (payload) => {
    //   this.$toastr.success('New Message <a href="chat/'+payload.data.chat_id +'" class="btn btn-toast">View</a>' , 'New Message Alert', {onclick: null});
    // })
    this.$echo
      .private('private-admin-chat')
      .listen('NewMessage', payload => {
        this.$toastr.success(
          'New Message <a href="chat/' +
            payload.data.chat_id +
            '" class="btn btn-toast">View</a>',
          'New Message Alert',
          { onclick: null },
        );
      })
      .listen('TripEvent', payload => {
        this.$toastr.success(
          'Click this button to <a href="requests/' +
            payload.data.id +
            '" class="btn btn-toast">View</a>',
          'New Trip Request',
          { onclick: null },
        );
        this.getNotification();
      });

    this.getNotification();
  },
  methods: {
    ...mapActions({ notification: 'GetNotification' }),

    async getNotification() {
      this.loading = true;
      await this.notification()
        .then(res => {})
        .catch(error => {});
    },
  },
};
</script>

<style lang="scss">
// CoreUI Icons Set
@import '~@coreui/icons/css/coreui-icons.min.css';
/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';
/* Import Simple Line Icons Set */
$simple-line-font-path: '~simple-line-icons/fonts/';
@import '~simple-line-icons/scss/simple-line-icons.scss';
/* Import Flag Icons Set */
@import '~flag-icon-css/css/flag-icon.min.css';
/* Import Bootstrap Vue Styles */
@import '~bootstrap-vue/dist/bootstrap-vue.css';
// Import Main styles for this application
@import 'assets/scss/style';
</style>

