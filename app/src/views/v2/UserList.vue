<template>
  <div class="py-4 container-fluid">
    <router-link to="/users/create" class="btn btn-primary mb-2">
      Novo usuário
    </router-link>
    <div class="row">
      <div class="col-12">
        <users-table />
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from "./components/UsersTable";

export default {
  name: "UserList",
  components: {
    UsersTable,
  },
};
</script>
