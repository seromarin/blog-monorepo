<template>
  <div class="container">
    <div class="header has-text-centered">
      <h1 class="header__title title">Login</h1>
    </div>

    <b-message :active.sync="error" title="Danger" type="is-danger">
      Ha ocurrido un error durante el login. Por favor intentalo de nuevo.
    </b-message>

    <b-message title="Success" :active.sync="succed" type="is-success">
      Login exitoso. Bienvenido.
    </b-message>

    <form @submit.prevent="loginUser">
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

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" type="submit">Submit</button>
        </div>
        <div class="control">
          <button
            class="button is-link is-light"
            @click.prevent="clearFormData"
          >
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
import loginUser from "@/utils/interfaces/loginUser.interface";
import { Component } from "vue-property-decorator";
import { server } from "@/utils/helpers";
import router from "@/router";

// const VueCookies = require("vue-cookies");
import * as VueCookies from "vue-cookies";

Vue.use(VueCookies);

@Component({
  name: "login"
})
export default class Login extends Vue {
  username: string = "";
  password: string = "";

  succed: boolean = false;
  error: boolean = false;
  errorMessage: any;
  succedMessage: any;

  loginUser() {
    const postData: loginUser = {
      username: this.username,
      password: this.password
    };

    this.submitToServer(postData);
  }

  private async submitToServer(postData: loginUser) {
    try {
      const responseData = await axios.post(
        `${server.baseURL}/auth/login`,
        postData
      );
      this.succed = true;
      this.succedMessage = responseData;
      Vue.$cookies.set(
        "token",
        `Bearer ${this.succedMessage.data.access_token}`
      );
      setTimeout(() => {
        this.succed = false;
        router.push({ name: "home" });
      }, 3000);
      console.log("response data", responseData);
    } catch (error) {
      this.error = true;
      this.errorMessage = error;
      setTimeout(() => {
        this.error = false;
      }, 3000);
      console.log("response error data", error);
    }
  }

  private clearFormData() {
    this.username = "";
    this.password = "";
  }
}
</script>
