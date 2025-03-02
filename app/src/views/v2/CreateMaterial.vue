<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <create-material-form />
      </div>
    </div>
  </div>
</template>

<script>
import CreateMaterialForm from "./components/CreateMaterialForm.vue";

export default {
  name: "create-material",
  components: {
    CreateMaterialForm,
  },
};
</script>
