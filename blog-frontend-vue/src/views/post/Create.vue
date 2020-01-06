<template>
  <section class="container">
    <form @submit.prevent="createPost">
      <b-field label="Title">
        <b-input v-model="title"></b-input>
      </b-field>

      <b-field label="Description">
        <b-input v-model="description"></b-input>
      </b-field>

      <b-field label="Body">
        <b-input v-model="body" maxlength="200" type="textarea"></b-input>
      </b-field>

      <button type="submit">Submit</button>
    </form>
  </section>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import blogPost from "@/utils/interfaces/blogPost.interface";
import { Prop, Component } from "vue-property-decorator";
import { server } from "@/utils/helpers";
import router from "@/router";

@Component({
  name: "create"
})
export default class Create extends Vue {
  title: string = "";
  description: string = "";
  body: string = "";
  author: string = "";
  date_posted: string = "";

  // Lifecycle Hooks

  created() {
    this.author = "@Seromarin";
    this.date_posted = new Date().toLocaleDateString();
  }

  // Computed

  //Methods

  createPost() {
    const postData: blogPost = {
      title: this.title,
      description: this.description,
      body: this.body,
      author: this.author,
      date_posted: this.date_posted
    };

    this.submitToServer(postData);
  }

  private submitToServer(postData: blogPost) {
    axios.post(`${server.baseURL}/blog/post`, postData).then(data => {
      router.push({ name: "home" });
    });
  }
}
</script>
