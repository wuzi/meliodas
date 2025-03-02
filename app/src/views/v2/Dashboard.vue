<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-6 col-sm-6 mb-xl-0 mb-6">
        <mini-statistics-card
          title="Usuários Cadastrados"
          :value="count.users"
          :icon="{
            component: 'ni ni-money-coins',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-6 col-sm-6 mb-xl-0 mb-6">
        <mini-statistics-card
          title="Materiais Cadastrados"
          :value="count.materials"
          :icon="{
            component: 'ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-success",
    };
  },
  components: {
    MiniStatisticsCard,
  },
  computed: {
    count() {
      return this.$store.getters.count;
    },
  },
  methods: {
    ...mapActions(["fetchCounts"]),
  },
  async mounted() {
    await this.fetchCounts();
  },
};
</script>
