<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Basic</h4>
          </template>
          <template v-slot:body>
            <p>Creating basic google map</p>
            <iframe
              class="w-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902543.2003194243!2d-118.04220880485131!3d36.56083290513502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80be29b9f4abb783%3A0x4757dc6be1305318!2sInyo%20National%20Forest!5e0!3m2!1sen!2sin!4v1576668158879!5m2!1sen!2sin"
              height="500"
              allowfullscreen=""
            ></iframe>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Street View</h4>
          </template>
          <template v-slot:body>
            <p>Street View google map</p>
            <iframe
              class="w-100"
              src="https://www.google.com/maps/embed?pb=!4v1576670414304!6m8!1m7!1sCAoSLEFGMVFpcFBmeGNVWUhFYmRqNWFzLTlsTjgyQUVMbTY1ckNqcmdMRDFjcy16!2m2!1d37.41885!2d-122.0798!3f191.60895907234024!4f-16.305518968749!5f0.4000000000000002"
              height="500"
              allowfullscreen=""
            ></iframe>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Satellite</h4>
          </template>
          <template v-slot:body>
            <p>Satellite View google map</p>
            <iframe
              class="w-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d552.6523460203307!2d-121.8326811833386!3d38.44960145310393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085259f4fcf781d%3A0x80a4c8c2bb5a0123!2s835%20Woodvale%20Dr%2C%20Dixon%2C%20CA%2095620%2C%20USA!5e1!3m2!1sen!2sin!4v1576670825530!5m2!1sen!2sin"
              height="500"
              allowfullscreen=""
            ></iframe>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from "../../config/pluginInit";
import iqCard from "../../components/xray/cards/iq-card";
export default {
  name: "GoogleMaps",
  components: { iqCard },
  mounted() {
    xray.index();
  },
};
</script>
