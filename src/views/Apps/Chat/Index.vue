<template>
  <b-container fluid>
    <b-row class="mb-4">
      <b-col lg="3" class="chat-data-left scroller">
        <div class="chat-sidebar-channel scroller ps-3">
          <h5>Public Channels</h5>
          <tab-nav
            :pills="true"
            :vertical="true"
            class="iq-chat-ui"
            id="chat-list-data"
          >
            <template v-for="(item, index) in publicChannel" :key="index">
              <tab-nav-items liClass="" data-toggle="pill" href="#chatbox">
                <template v-slot:title>
                  <chatItem :item="item" />
                </template>
              </tab-nav-items>
            </template>
          </tab-nav>
        </div>
      </b-col>
      <div class="col-lg-9 chat-data p-0 chat-data-right">
        <tab-content id="v-pills-tabContent">
          <tab-content-item
            id="v-pills-default"
            aria-labelled-by="v-pills-default"
          >
            <ToggleButton
              :mini-toggle="true"
              :close-button="false"
              toggleShow="#chat-user-detail-popup"
              mediaClass="chat-user-profile"
            >
              <template v-slot:media> </template>
              <template v-slot:body> </template>
            </ToggleButton>
            <div class="chat-start">
              <span class="iq-start-icon text-primary"
                ><i class="ri-message-3-line"
              /></span>
              <div class="mt-4">
                <b-button variant="primary iq-waves-effect" size="lg"
                  >Start Conversation!</b-button
                >
              </div>
            </div>
          </tab-content-item>
          <tab-content-item id="chatbox" aria-labelled-by="v-pills-default">
            <div class="chat-head">
              <header
                class="d-flex justify-content-between align-items-center bg-white pt-3 pe-3 pb-3"
              >
                <ToggleButton
                  :mini-toggle="true"
                  :close-button="false"
                  toggleShow="#chat-user-detail-popup"
                  mediaClass="chat-user-profile"
                >
                  <template v-slot:media>
                    <img
                      :src="checkUser(5, 'image')"
                      alt="avatar"
                      class="avatar-50"
                    />
                    <span class="avatar-status"
                      ><i class="ri-checkbox-blank-circle-fill text-success"
                    /></span>
                  </template>
                  <template v-slot:body>
                    <h5 class="mb-0">{{ checkUser(5, "name") }}</h5>
                  </template>
                </ToggleButton>
                <ToggleContent
                  id="chat-user-detail-popup"
                  bodyClass="chatuser-detail"
                  center
                >
                  <template v-slot:media>
                    <img :src="checkUser(5, 'image')" alt="avatar" />
                  </template>
                  <template v-slot:title>
                    <div class="user-name mt-4">
                      <h4>{{ checkUser(5, "name") }}</h4>
                    </div>
                    <div class="user-desc"><p>Cape Town, RSA</p></div>
                  </template>
                  <template v-slot:body>
                    <div class="row">
                      <div class="col-6 col-md-6 title">Nik Name:</div>
                      <div class="col-6 col-md-6 text-right">
                        {{ checkUser(5, "name") }}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-6 col-md-6 title">Tel:</div>
                      <div class="col-6 col-md-6 text-right">072 143 9920</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-6 col-md-6 title">Date Of Birth:</div>
                      <div class="col-6 col-md-6 text-right">July 12, 1989</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-6 col-md-6 title">Gender:</div>
                      <div class="col-6 col-md-6 text-right">Male</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-6 col-md-6 title">Language:</div>
                      <div class="col-6 col-md-6 text-right">Engliah</div>
                    </div>
                  </template>
                </ToggleContent>
                <div class="chat-header-icons d-flex">
                  <a class="iq-bg-primary iq-waves-effect me-1 chat-icon-phone"
                    ><i class="ri-phone-line mr-0"
                  /></a>
                  <a class="iq-bg-primary iq-waves-effect me-1 chat-icon-video"
                    ><i class="ri-vidicon-line mr-0"
                  /></a>
                  <a class="iq-bg-primary iq-waves-effect me-1 chat-icon-delete"
                    ><i class="ri-delete-bin-line mr-0"
                  /></a>
                  <b-dropdown
                    id="dropdownMenuButton2"
                    right
                    variant="none iq-bg-primary iq-waves-effect remove-toggle"
                  >
                    <template v-slot:button-content>
                      <i class="ri-more-2-line mr-0" />
                    </template>
                    <b-dropdown-item href="#"
                      ><i class="fa fa-thumb-tack mr-0" aria-hidden="true"></i>
                      Pin to top</b-dropdown-item
                    >
                    <b-dropdown-item href="#"
                      ><i class="fa fa-trash-o mr-0" aria-hidden="true"></i>
                      Delete chat</b-dropdown-item
                    >
                    <b-dropdown-item href="#"
                      ><i class="fa fa-ban mr-0" aria-hidden="true"></i>
                      Block</b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </header>
            </div>
            <div class="chat-content scroller">
              <template v-for="(item, index) in chat" :key="index">
                <div class="chat" v-if="!item.me">
                  <div class="chat-user">
                    <a class="avatar m-0">
                      <img
                        :src="checkUser(item.userId, 'image')"
                        alt="avatar"
                        class="avatar-35"
                      />
                    </a>
                    <span class="chat-time mt-1">{{ item.time }}</span>
                  </div>
                  <div class="chat-detail">
                    <div class="chat-message">
                      <p>{{ item.text }}</p>
                    </div>
                  </div>
                </div>
                <div class="chat chat-left" v-else>
                  <div class="chat-user">
                    <a class="avatar m-0">
                      <img
                        :src="checkUser(item.userId, 'image')"
                        alt="avatar"
                        class="avatar-35"
                      />
                    </a>
                    <span class="chat-time mt-1">{{ item.time }}</span>
                  </div>
                  <div class="chat-detail">
                    <div class="chat-message">
                      <p>{{ item.text }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="chat-footer p-3 bg-white">
              <form
                class="d-flex align-items-center"
                action="javascript:void(0);"
              >
                <div class="chat-attagement d-flex">
                  <a href="javascript:void(0)"
                    ><i class="fa fa-smile-o pe-3" aria-hidden="true"></i
                  ></a>
                  <a href="javascript:void(0)"
                    ><i class="fa fa-paperclip pe-3" aria-hidden="true"></i
                  ></a>
                </div>
                <input
                  type="text"
                  class="form-control me-3"
                  placeholder="Type your message"
                />
                <button
                  type="submit"
                  class="btn btn-primary d-flex align-items-center p-2"
                >
                  <i class="fas fa-paper-plane" aria-hidden="true"></i
                  ><span class="d-none d-lg-block ml-1">Send</span>
                </button>
              </form>
            </div>
          </tab-content-item>
        </tab-content>
      </div>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from "../../../config/pluginInit";
import ChatItem from "../../../components/Chat/ChatItem.vue";
import ToggleButton from "../../../components/Chat/ToggleButton.vue";
import ToggleContent from "../../../components/Chat/ToggleContent.vue";
import { Users, MessagesUser1 } from "../../../FackApi/api/chat";
import User from "../../../Model/User";

export default {
  name: "ChatIndex",
  components: { ChatItem, ToggleButton, ToggleContent },
  mounted() {
    xray.index();
  },
  computed: {
    filteredList() {
      return this.usersList.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  data() {
    return {
      search: "",
      user: new User({
        id: 1,
        name: "Anna Sthesia",
        role: "Developer",
        image: require("../../../assets/images/user/08.jpg"),
        isActive: true,
      }),
      usersList: Users,
      chat: MessagesUser1,
      publicChannel: [
        {
          name: "Team Discussions",
          role: "Lorem Ipsum is",
          image: require("../../../assets/images/user/05.jpg"),
          status: "success",
        },
        {
          name: "Announcement",
          role: "This Sunday We",
          image: require("../../../assets/images/user/06.jpg"),
          status: "danger",
        },
        {
          name: "Doctors",
          role: "There are many",
          image: require("../../../assets/images/user/07.jpg"),
          status: "warning",
        },
        {
          name: "Nurses",
          role: "messages of Lorem",
          image: require("../../../assets/images/user/08.jpg"),
          status: "success",
        },
        {
          name: "OT Special",
          role: "Lorem Ipus used",
          image: require("../../../assets/images/user/09.jpg"),
          status: "info",
        },
        {
          name: "Paul molive",
          role: "translation by",
          image: require("../../../assets/images/user/06.jpg"),
          status: "warning",
        },
        {
          name: "Paige Turner",
          role: "messages of Lorem",
          image: require("../../../assets/images/user/10.jpg"),
          status: "success",
        },
        {
          name: "Barbe Ackue",
          role: "Simply random text",
          image: require("../../../assets/images/user/09.jpg"),
          status: "info",
        },
        {
          name: "Maya Didas",
          role: "but also lab",
          image: require("../../../assets/images/user/07.jpg"),
          status: "success",
        },
        {
          name: "Monty Carlo",
          role: "Contrary to popular",
          image: require("../../../assets/images/user/05.jpg"),
          status: "danger",
        },
      ],
    };
  },
  methods: {
    checkUser(item, type) {
      let user = this.usersList.find((user) => user.id === item);
      let final;
      if (user !== undefined) {
        switch (type) {
          case "name":
            final = user.name;
            break;
          case "image":
            final = user.image;
            break;
          case "role":
            final = user.role;
            break;
        }
        return final;
      }
      return require("../../../assets/images/user/05.jpg");
    },
  },
};
</script>
<style>
.remove-toggle::after {
  content: unset;
}
</style>
