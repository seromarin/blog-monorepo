<template>
  <div class="container">
    <div class="header has-text-centered">
      <h1 class="header__title title">Register</h1>
      <h2 class="subtitle">Create new user</h2>
    </div>
    <form @submit.prevent="registerUser">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            v-model="name"
            class="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="username"
            class="input"
            type="text"
            placeholder="Text input"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="password"
            class="input"
            type="password"
            placeholder="password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="email"
            class="input"
            type="email"
            placeholder="Email input"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
        <!-- <p class="help is-danger">This email is invalid</p> -->
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" type="submit">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { registerUser } from "@/utils/interfaces/registerUser.interface";
import { Component } from "vue-property-decorator";
import { server } from "@/utils/helpers";
import router from "@/router";

@Component({
  name: "register"
})
export default class Register extends Vue {
  name: string = "";
  username: string = "";
  password: string = "";
  email: string = "";
  register_date: Date;

  constructor() {
    super();
    this.register_date = new Date();
  }

  registerUser() {
    const postData: registerUser = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email,
      register_date: this.register_date
    };

    this.submitToServer(postData);
  }

  private submitToServer(postData: registerUser) {
    axios.post(`${server.baseURL}/auth/register`, postData).then(data => {
      console.log("esta es la respuesta del backend", data);
      router.push({ name: "home" });
    });
  }
}
</script>
