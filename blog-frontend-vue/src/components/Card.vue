<template>
  <div class="card card-content">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          src="https://bulma.io/images/placeholders/1280x960.png"
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div class="card-content">
      <h2>
        <a class="home__postList__item--link" href="#">{{ post.title }}</a>
      </h2>
      <h3>{{ post.description }}</h3>
      <div>
        <p class="home__postList__item--body"></p>
      </div>
      <br />
      <div class="home__postList__item--author">
        <h4>Author:</h4>
        <p>{{ post.author }}</p>
      </div>
      
    </div>
    <div class="content body-content">
      <p>{{ post.body }}</p>
      <router-link
        :to="{ name: 'edit', params: { id: post._id } }"
        class="button"
        >Edit Post
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import blogPost from "../utils/interfaces/blogPost.interface";

@Component
export default class Card extends Vue {
  @Prop({ default: {}}) post: any;
}
</script>

<style lang="scss" scoped>
.body-content {
  padding: 5px 15px;
}
</style>