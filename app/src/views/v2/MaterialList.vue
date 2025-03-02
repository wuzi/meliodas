<template>
  <div class="py-4 container-fluid">
    <router-link to="/materials/create" class="btn btn-primary mb-2">
      Novo material
    </router-link>
    <div class="row">
      <div class="col-12">
        <materials-table />
      </div>
    </div>
  </div>
</template>

<script>
import MaterialsTable from "./components/MaterialsTable";

export default {
  name: "materials",
  components: {
    MaterialsTable,
  },
};
</script>
