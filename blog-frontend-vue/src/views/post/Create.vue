<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create Post</h2>
      <form id="create-post-form" @submit.prevent="createPost">
        <div class="form-group col-md-12">
          <label for="title"> Title </label>
          <input
            type="text"
            id="title"
            v-model="title"
            name="title"
            class="form-control"
            placeholder="Enter title"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="description"> Description </label>
          <input
            type="text"
            id="description"
            v-model="description"
            name="description"
            class="form-control"
            placeholder="Enter Description"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="body"> Write Content </label>
          <textarea
            id="body"
            cols="30"
            rows="5"
            v-model="body"
            class="form-control"
          ></textarea>
        </div>
        <div class="form-group col-md-12">
          <label for="author"> Author </label>
          <input
            type="text"
            id="author"
            v-model="author"
            name="author"
            class="form-control"
          />
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Create Post</button>
        </div>
      </form>
    </div>
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
