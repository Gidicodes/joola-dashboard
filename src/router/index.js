import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store/store'


// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Requests = () => import('@/views/partials/Requests/Requests')
const Request = () => import('@/views/partials/Requests/Request')
const Progress = () => import('@/views/partials/Requests/Progress')

const Customers = () => import('@/views/partials/Customers/Customers')
const Customer = () => import('@/views/partials/Customers/Customer')
const CustomerLocation = () => import('@/views/partials/Customers/CustomerLocation')

const Drivers = () => import('@/views/partials/Drivers/Drivers')
const Driver = () => import('@/views/partials/Drivers/Driver')

const AddDriver = () => import('@/views/partials/Drivers/AddDriver')
const Chat = () => import('@/views/partials/Chats/Chat');
const Setting = () => import('@/views/partials/Settings/Settings');
const TrackTruck = () => import('@/views/partials/Settings/TrackDriver');




// const Colors = () => import('@/views/theme/Colors')
// const Typography = () => import('@/views/theme/Typography')

// const Charts = () => import('@/views/Charts')
// const Widgets = () => import('@/views/Widgets')

// // Views - Components
// const Cards = () => import('@/views/base/Cards')
// const Forms = () => import('@/views/base/Forms')
// const Switches = () => import('@/views/base/Switches')
// const Tables = () => import('@/views/base/Tables')
// const Tabs = () => import('@/views/base/Tabs')
// const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
// const Carousels = () => import('@/views/base/Carousels')
// const Collapses = () => import('@/views/base/Collapses')
// const Jumbotrons = () => import('@/views/base/Jumbotrons')
// const ListGroups = () => import('@/views/base/ListGroups')
// const Navs = () => import('@/views/base/Navs')
// const Navbars = () => import('@/views/base/Navbars')
// const Paginations = () => import('@/views/base/Paginations')
// const Popovers = () => import('@/views/base/Popovers')
// const ProgressBars = () => import('@/views/base/ProgressBars')
// const Tooltips = () => import('@/views/base/Tooltips')

// // Views - Buttons
// const StandardButtons = () => import('@/views/buttons/StandardButtons')
// const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
// const Dropdowns = () => import('@/views/buttons/Dropdowns')
// const BrandButtons = () => import('@/views/buttons/BrandButtons')

// // Views - Icons
// const Flags = () => import('@/views/icons/Flags')
// const FontAwesome = () => import('@/views/icons/FontAwesome')
// const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
// const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// // Views - Notifications
// const Alerts = () => import('@/views/notifications/Alerts')
// const Badges = () => import('@/views/notifications/Badges')
// const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
// const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
// const Users = () => import('@/views/users/Users')
// const User = () => import('@/views/users/User')

Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'requests',
          name: 'Requests',
          component: Requests
        },
        {
          path: 'started',
          name: 'Started Requests',
          component: Progress
        },
        {
          path: 'requests/:id',
          name: 'Request',
          component: Request
        },
        {
          path: 'customers',
          name: 'Customers',
          component: Customers
        },
        {
          path: 'users/:id',
          name: 'Customer',
          component: Customer
        },
        {
          path: 'user/location/:id',
          name: 'Customer Locations',
          component: CustomerLocation
        },
        {
          path: 'drivers',
          name: 'Drivers',
          component: Drivers
        },
        {
          path: 'drivers/:id',
          name: 'Driver',
          component: Driver
        },
        {
          path: 'driver/create',
          name: 'Add Drivers',
          component: AddDriver
        },
        {
          path: 'chat',
          name: 'Chat',
          component: Chat
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Setting
        },
        {
          path: 'trucks/track',
          name: 'Trucks',
          component: TrackTruck
        }

      ]
    },
    {
      path: '*',
      name: 'not-found',
      component: Page404,
  },
  
  ]

}

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),

})


router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const loggedIn = Store.getters.IS_AUTHENTICATED;

  if (!isPublic && !loggedIn) {
    return next({
      name: 'login',
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next({ name: 'Dashboard' });
  }

  next();
});

export default router;