<template>
  <div class="home">
    <SearchInput />
  </div>
</template>

<script>
import GithubService from "@/services/github";
import SearchInput from "@/components/SearchInput";

export default {
  name: "Home",
  components: { SearchInput },
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
