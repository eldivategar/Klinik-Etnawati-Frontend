<template>
  <div class="bg-dark p-3 mt-3" style="position: relative; min-height: 200px">
    <div style="position: absolute; top: 0; left: 0">
      <notification
        v-for="(notification, index) in notifications"
        :key="index"
        :title="notification.title"
        :time="notification.time"
        :iconColor="notification.iconColor"
      >
        {{ notification.message }}
      </notification>
    </div>
  </div>
</template>

<script>
import Notification from "./Notification.vue";

export default {
  name: "NotificationsStack",
  components: { Notification },
  props: {
    notifications: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
