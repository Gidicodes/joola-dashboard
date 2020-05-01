<template>
  <section>
    <div class="main-panel" slot="body">
      <Loader :loading-text="loadingText" :showFull="true" v-if="isLoading" />
      <div class="content-wrapper">
        <div class="page-header">
          <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
              <i class="mdi mdi-account-card-details"></i>
            </span>
            Settings
          </h3>
        </div>
        <div class="row mt-3">
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h5>Base Location</h5>
                <div class="jo-form">
                  <input
                    class="jo-form-group"
                    v-model="address"
                    @keyup.enter="searchPlace()"
                    placeholder="Enter the Location Address"
                  />
                  <b-button @click="searchPlace()">Search</b-button>
                </div>

                <div id="map" ref="map"></div>

                <div class="jo-flex">
                  <b-button
                    class="btn jo-blue ml-auto"
                    @click="setBaseLocation()"
                  >Set As Base Location</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { setting } from '@/services/setting.service';
export default {
  data() {
    return {
      map: null,
      isLoading: false,
      place: {
        lat: 9.0,
        lng: 8.036,
      },
      address: '',
      position: {},
      marker: null,
    };
  },
  mounted() {
    this.getBaseLocation();
    this.map = new window.google.maps.Map(this.$refs['map'], {
      center: { lat: this.place.lat, lng: this.place.lng },
      zoom: 10,
    });
  },
  methods: {
    searchPlace() {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: this.address }, res => {
        this.map.setCenter(res[0].geometry.location);
        this.address = res[0].formatted_address;
        this.position = res[0].geometry.location;
        this.map.setZoom(17);
        this.removeMarker();
        this.setPosition();
      });
    },
    setPosition() {
      this.marker = new window.google.maps.Marker({
        map: this.map,
        position: this.position,
      });
    },
    removeMarker() {
      if (this.marker) {
        this.marker.setMap(null);
      }
    },
    setBaseLocation() {
        let data = {
            'address': this.address,
            'lat': this.position.lat(),
            'lon': this.position.lng()
        }
        setting.postBaseLocation(data).then((res)=> {
            this.$toastr.success('','Successfully Updated Base Location',{ onclick: null })
        }).catch((err) => {
            this.$toastr.error('', 'Something went wrong');
        })
    },
    async getBaseLocation() {
      await setting
        .getBaseLocation()
        .then(res => {
          this.address = res.data.address;
          this.position.lat = parseFloat(res.data.lat);
          this.position.lng = parseFloat(res.data.lon);
          this.map.setCenter({lat:this.position.lat, lng:this.position.lng});
          this.setPosition();
        })
        .catch(err => {});
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 400px;
}
</style>