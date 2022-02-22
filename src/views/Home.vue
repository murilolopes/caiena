<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import GithubService from "@/services/github";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchGithubData() {
      try {
        const data = await GithubService.fetchUsers({
          q: "murilo",
          page: 2,
        });

        this.users = data.items;
      } catch (error) {
        console.log("errors:", error);
      }
    },
  },
};
</script>
