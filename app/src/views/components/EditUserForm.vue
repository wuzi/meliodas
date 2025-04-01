<template>
  <div class="container">
    <h2>Editar {{ userName }}</h2>
    <form @submit.prevent="submit">
      <div class="form-group" v-if="user.picture">
        <label>Foto Atual</label>
        <div class="d-flex flex-wrap">
          <img :src="getImageUrl(user.picture)" alt="User Picture" class="img-thumbnail" width="100" height="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" v-model="user.name" class="form-control" id="name" required />
      </div>
      <div class="form-group">
        <label for="registrationNumber">Número de Registro</label>
        <input type="text" v-model="user.registrationNumber" class="form-control" id="registrationNumber" required />
      </div>
      <div class="form-group">
        <label for="category">Categoria</label>
        <select v-model="user.category" class="form-control" id="category" required>
          <option value="STUDENT">Aluno</option>
          <option value="COLLABORATOR">Colaborador</option>
          <option value="PROFESSOR">Professor</option>
          <option value="OTHER">Outros</option>
        </select>
      </div>
      <div class="form-group">
        <label for="profile">Perfil</label>
        <select v-model="user.profile" class="form-control" id="profile" required>
          <option value="ADMIN">Administrador</option>
          <option value="RESEARCH_COORDINATOR">Coordenador de pesquisa</option>
          <option value="EXTENSION_COORDINATOR">Coordenador de extensão</option>
          <option value="OTHER">Outros</option>
        </select>
      </div>
      <div class="form-group">
        <label for="course">Curso</label>
        <input type="text" v-model="user.course" class="form-control" id="course" />
      </div>
      <div class="form-group">
        <label for="department">Departamento</label>
        <input type="text" v-model="user.department" class="form-control" id="department" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="user.email" class="form-control" id="email" required />
      </div>
      <div class="form-group">
        <label for="phone">Telefone</label>
        <input type="text" v-model="user.phone" class="form-control" id="phone" />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" v-model="user.password" class="form-control" id="password" />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmar Senha</label>
        <input type="password" v-model="user.confirmPassword" class="form-control" id="confirmPassword" />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="user.status" class="form-control" id="status" required>
          <option value="ACTIVE">Ativo</option>
          <option value="INACTIVE">Inativo</option>
        </select>
      </div>
      <div class="form-group">
        <label for="picture">Foto de Perfil</label>
        <input type="file" @change="onFileChange" class="form-control" id="picture" />
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
      userName: 'Usuário',
      user: {
        name: '',
        registrationNumber: '',
        category: 'STUDENT',
        profile: 'ADMIN',
        course: '',
        department: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        status: 'ACTIVE',
      },
      picture: null,
    }
  },
  methods: {
    ...mapActions(['editUser', 'fetchUser', 'uploadProfilePicture']),
    async submit() {
      if (this.user.password !== this.user.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'As senhas não conferem',
        });
        return;
      }
      await this.editUser({
        id: this.$route.params.id,
        user: {
          ...this.user,
          password: this.user.password || undefined,
          confirmPassword: undefined,
          tempPassword: undefined,
        }
      });
      if (this.picture) {
        const user = await this.uploadProfilePicture({id: this.$route.params.id, file: this.picture});
        this.user.picture = user.picture;
      }
      this.userName = this.user.name;
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Usuário editado com sucesso',
      });
      this.$router.push({ name: 'Usuários' });
    },
    onFileChange(event) {
      this.picture = event.target.files[0];
    },
    getImageUrl(filename) {
      return `http://localhost:3000/uploads/user-pictures/${filename}`;
    },
  },
  async mounted() {
    const user = await this.fetchUser({ id: this.$route.params.id });
    this.user = user;
    this.user.password = '';
    this.user.confirmPassword = '';
    this.userName = user.name;
  }
}
</script>
