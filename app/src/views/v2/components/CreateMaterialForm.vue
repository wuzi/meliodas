<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Novo material</h6>
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
                <label for="registration">Registro no Patrimônio UFSC</label>
                <input type="text" class="form-control" id="registration" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="kind">Tipo</label>
                <select class="form-select" id="kind">
                  <option selected disabled>Selecione uma opção</option>
                  <option value="1">Permanente</option>
                  <option value="2">Consumo</option>
                </select>
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
            <div class="col-12 col-md-12">
              <div class="form-group">
                <label for="description">Descrição</label>
                <textarea class="form-control" id="description" rows="3"></textarea>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</template>
