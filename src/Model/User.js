import { is } from "ramda";

export default class User {
  constructor(user = {}) {
    this.id = is(Number, user.id) ? user.id : 0;
    this.name = is(String, user.name) ? user.name : "";
    this.image = is(String, user.image) ? user.image : "";
    this.role = is(String, user.role) ? user.role : "";
    this.about = is(String, user.about) ? user.about : "";
    this.dob = is(String, user.dob) ? user.dob : "";
    this.userMessage = is(String, user.userMessage) ? user.userMessage : "";
    this.unreadMessage = is(String, user.unreadMessage)
      ? user.unreadMessage
      : "";
    this.isActive = is(Boolean, user.isActive) ? user.isActive : false;
  }
}
