<template>
  <div>
    <input type="text" v-model="term" @keyup.enter="search" />
    <b-button @click="search" :disabled="!term">Search</b-button>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      term: "",
    };
  },
  methods: {
    search() {
      if (!this.term) return;

      this.$store.dispatch("search", this.term, { root: true });
    },
  },
};
</script>

<style></style>
