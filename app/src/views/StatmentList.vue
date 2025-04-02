<template>
  <div class="empty-state">
    <div class="empty-state-container">
      <i class="empty-state-icon">📝</i>
      <h2 class="empty-state-title">Nenhuma declaração disponível</h2>
      <p class="empty-state-description">Crie uma declaração para começar</p>
      <button class="empty-state-button">Indisponível</button>
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
}

.empty-state-container {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.empty-state-description {
  color: #666;
  margin-bottom: 1.5rem;
}

.empty-state-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.empty-state-button:hover {
  background-color: #43a047;
}
</style>

<script>
export default {
  name: "StatmentList",
  components: {
  },
};
</script>
