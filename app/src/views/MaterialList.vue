<template>
  <div class="py-4 container-fluid">
    <router-link to="/materials/create" class="btn btn-primary mb-2">
      Novo material
    </router-link>
    <router-link to="/materials/report" target="_blank" class="btn btn-secondary mb-2 ms-2">
      Baixar relatório
    </router-link>
    <div class="row">
      <div class="col-12">
        <materials-table :materials="materials" />
      </div>
    </div>
  </div>
</template>

<script>
import MaterialsTable from "./components/MaterialsTable";
import { mapActions } from "vuex";

export default {
  name: "MaterialList",
  components: {
    MaterialsTable,
  },
  computed: {
    materials() {
      return this.$store.getters.materials;
    },
  },
  methods: {
    ...mapActions(["fetchMaterials"]),
  },
  async mounted() {
    await this.fetchMaterials();
  },
};
</script>
