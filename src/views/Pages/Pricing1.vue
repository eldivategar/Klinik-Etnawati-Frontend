<template>
  <b-container fluid>
    <b-row>
      <b-col lg="3" v-for="(item, index) in cards" :key="index">
        <iq-card
          body-class="text-center"
          :class="item.active ? 'bg-primary text-white' : ''"
        >
          <template v-slot:body>
            <span class="font-size-16 text-uppercase" v-if="item.plan !== ''">{{
              item.plan
            }}</span>
            <h2
              class="mb-4 display-3 font-weight-bolder"
              style="font-weight: bold"
              :class="item.active ? 'text-white' : ''"
            >
              {{ item.amount }}
              <small
                class="font-size-14"
                style="font-weight: bold"
                :class="item.active ? 'text-white' : 'text-muted'"
                >{{ item.duration }}</small
              >
            </h2>
            <ul class="list-unstyled line-height-4 mb-0">
              <li :class="item.active ? 'text-white' : 'text-primary'">
                {{ item.description }}
              </li>
            </ul>
            <b-button
              :variant="item.active ? 'light' : 'primary'"
              class="mt-5"
              :class="item.buttonClass"
              >{{ item.button }}</b-button
            >
          </template>
        </iq-card>
      </b-col>
      <b-col lg="3" v-for="(item, index) in bgCards" :key="index">
        <b-card
          overlay
          :img-src="item.bgImage"
          img-alt="Card Image"
          text-variant="white"
          bg-variant="dark"
          class="text-white text-center iq-mb-3"
        >
          <!-- <template> -->
          <h2
            class="mb-4 display-3 font-weight-bolder text-white"
            style="font-weight: bold"
          >
            {{ item.amount }}
            <small class="font-size-14" style="font-weight: bold">{{
              item.duration
            }}</small>
          </h2>
          <ul class="list-unstyled line-height-4 mb-0 px-2 text-white">
            <li>{{ item.description }}</li>
          </ul>
          <b-button
            :variant="item.active ? 'light' : 'primary'"
            class="mt-5"
            :class="item.buttonClass"
            >{{ item.button }}</b-button
          >
          <!-- </template> -->
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from "../../config/pluginInit";
import iqCard from "../../components/xray/cards/iq-card";
export default {
  name: "PricingOne",
  components: { iqCard },
  mounted() {
    xray.index();
  },
  data() {
    return {
      cards: [
        {
          plan: "Basic",
          amount: "$26",
          duration: "/ Month",
          active: false,
          description:
            "Lorem ipsum dolor sit amet Consectetur adipiscing elit Integer molestie lorem at massa Facilisis in pretium nisl aliquet Nulla volutpat aliquam velit",
          button: "Start Starter",
          buttonClass: "",
          bgImage: false,
        },
        {
          plan: "Basic",
          amount: "$99",
          duration: "/ Month",
          active: true,
          description:
            "Lorem ipsum dolor sit amet Consectetur adipiscing elit Integer molestie lorem at massa Facilisis in pretium nisl aliquet Nulla volutpat aliquam velit",
          button: "Start Starter",
          buttonClass: "btn-block",
          bgImage: false,
        },
        {
          plan: "Basic",
          amount: "$39",
          duration: "/ Month",
          active: false,
          description:
            "Lorem ipsum dolor sit amet Consectetur adipiscing elit Integer molestie lorem at massa Facilisis in pretium nisl aliquet Nulla volutpat aliquam velit",
          button: "Start Starter",
          buttonClass: "",
          bgImage: false,
        },
        {
          plan: "Basic",
          amount: "$25",
          duration: "/ Month",
          active: false,
          description:
            "Lorem ipsum dolor sit amet Consectetur adipiscing elit Integer molestie lorem at massa Facilisis in pretium nisl aliquet Nulla volutpat aliquam velit",
          button: "Start Starter",
          buttonClass: "",
          bgImage: false,
        },
      ],
      bgCards: [
        {
          plan: "Basic",
          amount: "19",
          duration: "$/ Month",
          active: false,
          description:
            "Lorem ipsum dolor sit amet Consectetur adipiscing elit Integer molestie lorem at massa Facilisis in pretium nisl aliquet Nulla volutpat aliquam velit",
          button: "Get Started",
          buttonClass: "",
          bgImage: require("../../assets/images/page-img/25.jpg"),
        },
        {
          plan: "Basic",
          amount: "19",
          duration: "$/ Month",
          active: false,
          description:
            "Lorem ipsum dolor sit amet Consectetur adipiscing elit Integer molestie lorem at massa Facilisis in pretium nisl aliquet Nulla volutpat aliquam velit",
          button: "Get Started",
          buttonClass: "",
          bgImage: require("../../assets/images/page-img/26.jpg"),
        },
        {
          plan: "Basic",
          amount: "19",
          duration: "$/ Month",
          active: false,
          description:
            "Lorem ipsum dolor sit amet Consectetur adipiscing elit Integer molestie lorem at massa Facilisis in pretium nisl aliquet Nulla volutpat aliquam velit",
          button: "Get Started",
          buttonClass: "",
          bgImage: require("../../assets/images/page-img/27.jpg"),
        },
        {
          plan: "Basic",
          amount: "19",
          duration: "$/ Month",
          active: false,
          description:
            "Lorem ipsum dolor sit amet Consectetur adipiscing elit Integer molestie lorem at massa Facilisis in pretium nisl aliquet Nulla volutpat aliquam velit",
          button: "Get Started",
          buttonClass: "",
          bgImage: require("../../assets/images/page-img/28.jpg"),
        },
      ],
    };
  },
};
</script>
