<template>
  <div class="container">
    <h2>Editar Material</h2>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" v-model="material.name" class="form-control" id="name" required />
      </div>
      <div class="form-group">
        <label for="patrimonyNumber">Número de Patrimônio</label>
        <input type="text" v-model="material.patrimonyNumber" class="form-control" id="patrimonyNumber" required />
      </div>
      <div class="form-group">
        <label for="type">Tipo</label>
        <select v-model="material.type" class="form-control" id="type" required>
          <option value="PERMANENT">Permanente</option>
          <option value="CONSUMABLE">Consumível</option>
        </select>
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="material.status" class="form-control" id="status" required>
          <option value="ACTIVE">Ativo</option>
          <option value="INACTIVE">Inativo</option>
        </select>
      </div>
      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea v-model="material.description" class="form-control" id="description"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Swal from "sweetalert2";

export default {
  data() {
    return {
      material: {
        name: '',
        patrimonyNumber: '',
        type: 'PERMANENT',
        status: 'ACTIVE',
        description: '',
      }
    }
  },
  methods: {
    ...mapActions(['editMaterial', 'fetchMaterial']),
    async submit() {
      await this.editMaterial({ id: this.$route.params.id, material: this.material });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Material editado com sucesso',
      });
      this.$router.push({ name: 'MaterialList' });
    }
  },
  async mounted() {
    const material = await this.fetchMaterial({ id: this.$route.params.id });
    this.material = material;
  }
}
</script>
