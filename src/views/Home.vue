<template>
  <div class="home">
    <search-input />
    <users-table />
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import UsersTable from "../components/UsersTable.vue";

export default {
  name: "Home",
  components: { SearchInput, UsersTable },
};
</script>
