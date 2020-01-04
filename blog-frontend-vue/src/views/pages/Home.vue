<template>
  <div class="home">
    <b-button>Click Me Please!</b-button>
    <Card />
    <!-- <p>{{ allPost }}</p> -->
    <p v-if="loading">Loading...</p>
    <div v-else>
      <p v-if="isPosted">No se encontraron datos</p>
      <div v-else>
        <h1 class="home__title">{{ titlePage }}</h1>
        <div class="home__postList">
          <div
            class="home__postList__item"
            v-for="post in allPost"
            :key="post.id"
          >
            <h2>
              <a class="home__postList__item--link" href="#">{{
                post.title
              }}</a>
            </h2>
            <h3>{{ post.description }}</h3>
            <div>
              <p class="home__postList__item--body">{{ post.body }}</p>
            </div>
            <br />
            <div class="home__postList__item--author">
              <h4>Author:</h4>
              <p>{{ post.author }}</p>
            </div>
            <router-link
              :to="{ name: 'edit', params: { id: post._id } }"
              class="btn btn-sm btn-outline-secondary"
              >Edit Post
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import Create from "@/views/post/Create.vue";
import Vue from "vue";
import axios from "axios";
import { server } from "@/utils/helpers";
import { Component } from "vue-property-decorator";

import Card from "@/components/Card.vue";

@Component({
  name: "home",
  components: {
    Card
  }
})
export default class Home extends Vue {
  titlePage = "El mejor blog del mundo";
  allPost: any = [];
  loading: boolean = true;

  // Lifecycle Hooks

  created() {
    this.getAllPosts();
  }

  // Computed
  get isPosted() {
    return this.allPost.length === 0;
  }

  // Methods
  getAllPosts() {
    this.loading = true;
    axios
      .get(`${server.baseURL}/blog/posts`)
      .then(res => (this.allPost = res.data))
      .finally(() => (this.loading = false));
  }
}
</script>

<style lang="scss" scoped>
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

.home {
  &__title {
    padding-bottom: 1rem;
  }
  &__postList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    &__item {
      padding-bottom: 1rem;
      &--link {
        text-decoration: none;
        color: #42b983;
      }
      &--body {
      }
      &--author {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
