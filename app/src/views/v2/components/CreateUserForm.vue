<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Novo usuário</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <form class="p-4" @submit.prevent="submit">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="name">Nome</label>
                <input type="text" class="form-control" id="name" placeholder="Nome do usuário" required v-model="user.name" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="registrationNumber">Matrícula/SIAPE</label>
                <input type="text" class="form-control" id="registrationNumber" placeholder="Ex: 123456" required v-model="user.registrationNumber" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="category">Categoria</label>
                <select class="form-select" id="category" required v-model="user.category">
                  <option value="STUDENT">Aluno</option>
                  <option value="COLLABORATOR">Colaborador</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="OTHER">Outros</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="profile">Perfil</label>
                <select class="form-select" id="profile" required v-model="user.profile">
                  <option value="ADMIN">Administrador</option>
                  <option value="RESEARCH_COORDINATOR">Coordenador de pesquisa</option>
                  <option value="EXTENSION_COORDINATOR">Coordenador de extensão</option>
                  <option value="OTHER">Outros</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="course">Curso</label>
                <input type="text" class="form-control" id="course" placeholder="Nome do curso" required v-model="user.course"/>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="department">Departamento</label>
                <input type="text" class="form-control" id="department" placeholder="Departamento do usuário" required v-model="user.department" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" class="form-control" id="email" placeholder="Email do usuário" required v-model="user.email" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="phone">Telefone</label>
                <input type="text" class="form-control" id="phone" placeholder="Telefone do usuário" required v-model="user.phone" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" class="form-control" id="password" placeholder="****" required v-model="user.password" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="confirmPassword">Confirmar senha</label>
                <input type="password" class="form-control" id="confirmPassword" placeholder="****" required v-model="user.confirmPassword" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="status">Status</label>
                <select class="form-select" id="status" v-model="user.status">
                  <option selected value="ACTIVE">Ativo</option>
                  <option value="INACTIVE">Inativo</option>
                </select>
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
    ...mapActions(['createUser']),
    async submit() {
      if (this.user.password !== this.user.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'As senhas não conferem',
        });
        return;
      }
      await this.createUser({ user: this.user });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Usuário criado com sucesso',
      });
      this.$router.push({ name: 'Usuários' });
    }
  }
}
</script>
