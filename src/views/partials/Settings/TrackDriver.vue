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
            Track Trucks
          </h3>
        </div>
        <div class="row mt-3">
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <iframe id="track" src="http://monitor.fleetrakams.com/?sid=029c1b0aa860589367a0b60d9fce72fb" ref="track"/>
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
#track {
  height: 600px;
  width: 100%;
}
</style>