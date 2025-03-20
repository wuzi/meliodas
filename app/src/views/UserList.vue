<template>
  <div class="py-4 container-fluid">
    <router-link to="/users/create" class="btn btn-primary mb-2">
      Novo usuário
    </router-link>
    <router-link to="/users/report" target="_blank" class="btn btn-secondary mb-2 ms-2">
      Baixar relatório
    </router-link>
    <div class="row">
      <div class="col-12">
        <users-table :users="users" />
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from "./components/UsersTable";
import { mapActions } from "vuex";

export default {
  name: "UserList",
  components: {
    UsersTable,
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    ...mapActions(["fetchUsers"]),
  },
  async mounted() {
    await this.fetchUsers();
  },
};
</script>
