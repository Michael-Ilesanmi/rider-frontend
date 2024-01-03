<template>
  <div class="w-full h-full">
    <GoogleMap api-key="AIzaSyCyJxGQXDd-AOnYchsTZL5X_H5KjSMilss" style="width: 100%; height: 100%" :center="center" :zoom="15" ref="mapRef">
      <Marker :options="{ position: marker }" v-for="(marker, index) in myMarkers" :key="index" />
    </GoogleMap>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  props: {
    locationA: Object,
    locationB: Object,
  },
  setup(props) {
    const mapRef = ref(null);
    const center = props.locationA;
    const myMarkers = [props.locationA, props.locationB];
    const address = ref("");
    const _lng = ref(10);
    const lng = computed(() => Object.assign({}, myMarkers));
    onMounted(() => {
      setTimeout(() => {
        if (mapRef.value?.ready) {
          let api = mapRef.value.api;
          let directionService = new api.DirectionsService();
          let directionDisplay = new api.DirectionsRenderer();
          let travel = {
            origin: myMarkers[0],
            destination: myMarkers[1],
            travelMode: 'DRIVING',
          }
          directionService.route(travel, (res, status) => {
            if (status === 'OK') {
                let map = mapRef.value;
                directionDisplay = new api.DirectionsRenderer({
                    polylineOptions:{
                        strokeColor: '#2ab3a6',
                        stropeOpacity: 0.8,
                        strokeWeight: 5,
                    }
                })
                directionDisplay.setMap(map.map)
                directionDisplay.setDirections(res)   
            }
          })
        }
      }, 500);
    });
    return { center, myMarkers, lng, mapRef , address, props };
  },
});
</script>