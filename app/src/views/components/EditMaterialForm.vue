<template>
  <div class="container">
    <h2>Editar Material</h2>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" v-model="material.name" class="form-control" id="name" required />
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
      <div class="form-group" v-if="material.type === 'PERMANENT'">
        <label for="patrimonyNumber">Número de Patrimônio</label>
        <input type="text" v-model="material.patrimonyNumber" class="form-control" id="patrimonyNumber" required />
      </div>
      <div class="form-group" v-if="material.type === 'CONSUMABLE'">
        <label for="quantity">Quantidade</label>
        <input type="number" v-model="material.quantity" class="form-control" id="quantity" min="0" placeholder="0" required />
      </div>
      <div class="form-group" v-if="material.type === 'CONSUMABLE'">
        <label for="minimum_quantity">Quantidade Mínima</label>
        <input type="number" v-model="material.minimum_quantity" class="form-control" id="minimum_quantity" min="0" placeholder="0" required />
      </div>
      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea v-model="material.description" class="form-control" id="description"></textarea>
      </div>
      <div class="form-group">
        <label>Imagens</label>
        <div class="d-flex flex-wrap">
          <div v-for="image in material.images" :key="image.id" class="m-2">
            <img :src="getImageUrl(image.filename)" alt="Material Image" class="img-thumbnail" width="100" height="100" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="newImages">Adicionar Imagens</label>
        <input type="file" @change="onFileChange" class="form-control" id="newImages" multiple />
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
        quantity: null,
        minimum_quantity: null,
        images: [],
      },
      newImages: [],
    }
  },
  methods: {
    ...mapActions(['editMaterial', 'fetchMaterial', 'uploadMaterialImage']),
    async submit() {
      await this.editMaterial({ id: this.$route.params.id, material: this.material });
      if (this.newImages.length > 0) {
        for (const file of this.newImages) {
          const image = await this.uploadMaterialImage({ id: this.$route.params.id, file });
          this.material.images.push(image);
        }
      }
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Material editado com sucesso',
      });
      this.$router.push({ name: 'MaterialList' });
    },
    onFileChange(event) {
      this.newImages = Array.from(event.target.files);
    },
    getImageUrl(filename) {
      return `http://localhost:3000/uploads/material-images/${filename}`;
    },
  },
  async mounted() {
    const material = await this.fetchMaterial({ id: this.$route.params.id });
    this.material = material;
  }
}
</script>
