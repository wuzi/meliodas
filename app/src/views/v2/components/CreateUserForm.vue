<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Novo usuário</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <form class="p-4">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="name">Nome</label>
                <input type="text" class="form-control" id="name" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="matricula">Matrícula/SIAPE</label>
                <input type="text" class="form-control" id="matricula" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="role">Função</label>
                <select class="form-select" id="role">
                  <option selected disabled>Selecione uma opção</option>
                  <option value="1">Aluno</option>
                  <option value="2">Colaborador</option>
                  <option value="3">Professor</option>
                  <option value="4">Outros</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="kind">Tipo</label>
                <select class="form-select" id="kind">
                  <option selected disabled>Selecione uma opção</option>
                  <option value="1">Administrador</option>
                  <option value="2">Coordenador de pesquisa</option>
                  <option value="3">Coordenador de extensão</option>
                  <option value="4">Outros</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="course">Curso</label>
                <input type="text" class="form-control" id="course" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="department">Departamento</label>
                <input type="text" class="form-control" id="department" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" class="form-control" id="email" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="phone">Telefone</label>
                <input type="text" class="form-control" id="phone" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" class="form-control" id="password" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="confirmPassword">Confirmar senha</label>
                <input type="password" class="form-control" id="confirmPassword" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="status">Status</label>
                <select class="form-select" id="status">
                  <option selected value="1">Ativo</option>
                  <option value="2">Inativo</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</template>
