<template>
  <div>
    <b-table
      v-if="$store.state.users"
      show-empty
      :fields="fields"
      :items="$store.state.users"
      :busy.sync="$store.state.busy"
      empty-html="No results found"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(avatar_url)="item">
        <img :src="item.item.avatar_url" width="50" height="50" />
      </template>
      <template #cell(html_url)="item">
        <a :href="item.item.html_url" target="_blank">Link</a>
      </template>
    </b-table>
    <b-pagination
      v-if="$store.state.users"
      v-model="$store.state.selectedPage"
      :total-rows="$store.state.total_count"
      :per-page="$store.state.per_page"
      @change="changePage"
    />
  </div>
</template>

<script>
export default {
  name: "UsersTable",
  data() {
    return {
      fields: [
        { key: "avatar_url", sortable: true },
        { key: "login", sortable: true },
        { key: "html_url", sortable: true },
      ],
    };
  },
  methods: {
    changePage(page) {
      this.$store.dispatch("changePage", page);
    },
  },
};
</script>

<style></style>
