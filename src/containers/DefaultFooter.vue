<template>
      <TheFooter>
        <div>
          <!--footer-->
          <span class="ml-1">&copy; {{copywrite()}} JoolaOilandGas.</span>
        </div>
        <div class="ml-auto">
          
        </div>
      </TheFooter>
</template>
<script>
import { Footer as TheFooter } from '@coreui/vue'
import moment from 'moment'
export default {
  name: 'DefaultFooter',
  components: {
    TheFooter
  },
  methods: {
    copywrite(){
      return moment().get('year')
    }
  }
}
</script>
