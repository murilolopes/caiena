<template>
  <div>
    <input type="text" v-model="term" @keyup.enter="search" />
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
      this.$store.dispatch("search", this.term, { root: true });
    },
  },
};
</script>

<style></style>
