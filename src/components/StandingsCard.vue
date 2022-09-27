<template>
  <Card class="place-items-center">
    <h1 class="font-bold text-3xl">STANDINGS</h1>
    <select v-model="season"
        class="bg-red border-white border-2 p-1 text-xl text-center uppercase rounded-md w-24"
        @change="getStandingsForSeason()">
      <option v-for="season in seasons">{{ season }}</option>
    </select>
    <div v-for="user in standings" class="grid grid-cols-2 gap-x-4 text-xl">
      <h1 class="font-bold text-right capitalize"> {{ user.username }} </h1>
      <h1 class="text-left"> {{ user.points }} </h1>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card                   from "../components/Card.vue";
import { onBeforeMount, ref } from "vue";
import { NextRace }           from "../typings/typings";
import axios                  from "axios";

const standings = ref();
const season    = ref();
const seasons   = ref();

async function getSeasons() {
  const seasonsRes = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/seasons`);

  seasons.value = <Array<Number>>seasonsRes.data.seasons;
}

async function getStandings() {
  const nextRace = await axios.get(`${ import.meta.env.VITE_F1_API_URL }/event/next`);
  const raceData = <NextRace>nextRace.data;

  season.value = raceData.season;
  const round  = raceData.round;

  if (round <= 1) {
    season.value--;
  }

  const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/results/standings/${ season.value }`);

  standings.value = res.data.results;
}

async function getStandingsForSeason() {
  const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/results/standings/${ season.value }`);

  standings.value = res.data.results;
}

onBeforeMount(async () => {
  await getStandings();
  await getSeasons();
});
</script>

<style scoped>

</style>
