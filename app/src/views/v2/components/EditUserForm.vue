<template>
  <div class="container">
    <h2>Editar {{ userName }}</h2>
    <form @submit.prevent="submit">
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
          <option value="STUDENT">Estudante</option>
          <option value="TEACHER">Professor</option>
          <option value="STAFF">Funcionário</option>
        </select>
      </div>
      <div class="form-group">
        <label for="profile">Perfil</label>
        <select v-model="user.profile" class="form-control" id="profile" required>
          <option value="ADMIN">Administrador</option>
          <option value="USER">Usuário</option>
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
      }
    }
  },
  methods: {
    ...mapActions(['editUser', 'fetchUser']),
    async submit() {
      await this.editUser({ id: this.$route.params.id, user: this.user });
      this.userName = this.user.name;
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Usuário editado com sucesso',
      });
      this.$router.push({ name: 'UserList' });
    }
  },
  async mounted() {
    const user = await this.fetchUser({ id: this.$route.params.id });
    this.user = user;
    this.user.password = '';
    this.userName = user.name;
  }
}
</script>
