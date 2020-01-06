<template>
  <div class="home">
    <p v-if="loading">Loading...</p>
    <div v-else>
      <p v-if="isPosted">No se encontraron datos</p>
      <div v-else>
        <section class="hero is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                {{ titlePage }}
              </h1>
              <h2 class="subtitle">
                Powered by <a href="http://vuejs.org" target="blank">Vue</a>
              </h2>
            </div>
          </div>
        </section>
        <div class="home__postList">
          <div
            class="home__postList__item"
            v-for="post in allPost"
            :key="post.id"
          >
            <Card :post="post" />
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

.hero {
  text-align: center;
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
