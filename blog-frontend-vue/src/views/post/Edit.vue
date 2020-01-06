<template>
  <div class="container">
    <form @submit.prevent="editPost">
      <b-field label="Title">
        <b-input v-model="post.title"></b-input>
      </b-field>

      <b-field label="Description">
        <b-input v-model="post.description"></b-input>
      </b-field>

      <b-field label="Body">
        <b-input v-model="post.body" maxlength="200" type="textarea"></b-input>
      </b-field>
      <button type="submit">Edit Post</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import blogPost from "@/utils/interfaces/blogPost.interface";
import { Prop, Component } from "vue-property-decorator";
import { server } from "@/utils/helpers";
import router from "@/router";

@Component({
  name: "edit"
})
export default class Edit extends Vue {
  id: string = "";
  post: blogPost = {};

  // Lifecycle Hooks
  created() {
    this.id = this.$route.params.id;
    this.getPost();
  }

  // Computed

  //Methods

  editPost() {
    let postData = {
      title: this.post.title,
      description: this.post.description,
      body: this.post.body,
      author: this.post.author,
      date_posted: this.post.date_posted
    };

    axios
      .put(`${server.baseURL}/blog/edit?postID=${this.id}`, postData)
      .then(data => {
        router.push({ name: "home" });
      });
  }

  getPost() {
    axios
      .get(`${server.baseURL}/blog/post/${this.id}`)
      .then(data => (this.post = data.data));
  }

  navigate() {
    router.go(-1);
  }
}
</script>
