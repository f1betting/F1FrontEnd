<template>
  <Card class="place-items-center">
    <h1 class="font-bold text-3xl">STANDINGS</h1>
    <select v-model="season"
        class="bg-red border-white border-2 p-1 text-xl text-center uppercase rounded-md w-24"
        @change="getStandingsForSeason(season)">
      <option v-for="season in possibleSeasons">{{ season }}</option>
    </select>
    <div v-for="user in standings" class="grid grid-cols-2 gap-x-4 text-xl">
      <h1 class="font-bold text-right capitalize"> {{ user.username }} </h1>
      <h1 class="text-left"> {{ user.points }} </h1>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card                          from "../components/Card.vue";
import { onBeforeMount, ref }        from "vue";
import { F1Client }                  from "../client/f1";
import { BettingClient, UserResult } from "../client/betting";

const standings       = ref<Array<UserResult>>();
const season          = ref<number>();
const possibleSeasons = ref<Array<number>>();

const f1Client = new F1Client({
  BASE: `${ import.meta.env.VITE_F1_API_URL }`,
});

const bettingClient = new BettingClient({
  BASE: `${ import.meta.env.VITE_BETTING_API_URL }`,
});

async function getSeasons() {
  const seasonsRes      = await bettingClient.seasons.getSeasons();
  possibleSeasons.value = seasonsRes.seasons;
}

async function getStandings() {
  const nextRace = await f1Client.events.getNextRace();

  season.value = nextRace.season;
  const round  = nextRace.round;

  if (round <= 1) {
    season.value--;
  }

  await getStandingsForSeason(season.value);
}

async function getStandingsForSeason(season: number) {
  const standingsData = await bettingClient.results.getStandings(season);

  standings.value = standingsData.results;
}

onBeforeMount(async () => {
  await getStandings();
  await getSeasons();
});
</script>

<style scoped>

</style>
