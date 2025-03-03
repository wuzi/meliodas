<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <create-user-form />
      </div>
    </div>
  </div>
</template>

<script>
import CreateUserForm from "./components/CreateUserForm";

export default {
  name: "create-user",
  components: {
    CreateUserForm,
  },
};
</script>
