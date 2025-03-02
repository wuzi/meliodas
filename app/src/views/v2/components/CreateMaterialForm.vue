<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Novo material</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <form class="p-4" @submit.prevent="submit">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="name">Nome</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  required
                  placeholder="Nome do material"
                  v-model="material.name"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="registration">Registro no Patrimônio UFSC</label>
                <input
                  type="text"
                  class="form-control"
                  id="registration"
                  required
                  placeholder="Ex: 123456"
                  v-model="material.patrimonyNumber"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="type">Tipo</label>
                <select class="form-select" id="type" required v-model="material.type">
                  <option value="PERMANENT">Permanente</option>
                  <option value="CONSUMABLE">Consumo</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="status">Status</label>
                <select class="form-select" id="status">
                  <option value="ACTIVE">Ativo</option>
                  <option value="INACTIVE">Inativo</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-12">
              <div class="form-group">
                <label for="description">Descrição</label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  required
                  v-model="material.description"
                  placeholder="Descreva o material"
                ></textarea>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Criar</button>
        </form>
      </div>
    </div>
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
        type: 'PERMANENT',
        patrimonyNumber: '',
        description: '',
        status: 'ACTIVE',
      }
    }
  },
  methods: {
    ...mapActions(['createMaterial']),
    async submit() {
      await this.createMaterial({ material: this.material });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Material criado com sucesso',
      });
      this.$router.push({ name: 'Materiais' });
    }
  }
}
</script>
