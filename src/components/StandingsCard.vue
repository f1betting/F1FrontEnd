<template>
  <Card class="place-items-center">
    <h1 class="font-bold text-3xl">STANDINGS</h1>
    <div v-for="user in standings" class="grid grid-cols-2 gap-x-4 text-xl">
      <h1 class="font-bold text-right capitalize"> {{ user.username }} </h1>
      <h1 class="text-left"> {{ user.points }} </h1>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card                   from "../components/Card.vue";
import { onBeforeMount, ref } from "vue";
import axios                  from "axios";

const standings = ref();

async function getStandings() {
  const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/results/standings`);

  standings.value = res.data.results;
}

onBeforeMount(async () => {
  await getStandings();
});
</script>

<style scoped>

</style>
