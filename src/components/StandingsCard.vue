<template>
  <Card class="place-items-center">
    <h1 class="font-bold text-3xl">STANDINGS</h1>
    <select v-model="season"
            class="bg-red border-white border-2 p-1 text-xl text-center uppercase rounded-md w-24"
            @change="getStandingsForSeason(season)">
      <option v-for="season in possibleSeasons">{{ season }}</option>
    </select>
    <div v-for="user in standings" class="grid grid-cols-2 gap-x-4 text-xl">
      <h1 class="font-bold text-right capitalize"> {{ getUserName(user.username) }} </h1>
      <h1 class="text-left"> {{ user.points }} </h1>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from "../components/Card.vue";
import { onBeforeMount, ref } from "vue";
import { F1Client } from "../client/f1";
import { BettingClient, UserResult } from "../client/betting";

const standings = ref<Array<UserResult>>();
const season = ref<number>();
const possibleSeasons = ref<Array<number>>();

function getUserName(username: string) {
  const splitName = username.split(" ")

  const firstName = splitName[0]
  const lastName = splitName[splitName.length-1]

  return `${firstName} ${lastName[0]}.`
}

// Initialize API clients
const f1Client = new F1Client({
  BASE: `${ import.meta.env.VITE_F1_API_URL }`
});

const bettingClient = new BettingClient({
  BASE: `${ import.meta.env.VITE_BETTING_API_URL }`
});

// Fetch unique seasons that have bets on them
async function getSeasons() {
  const seasonsRes = await bettingClient.seasons.getSeasons();
  possibleSeasons.value = seasonsRes.seasons;
}

// Fetch standings
async function getStandings() {
  // Fetch next race
  const nextRace = await f1Client.events.getNextRace();

  season.value = nextRace.season;
  const round = nextRace.round;

  // Select previous season if round is 1
  if (round <= 1) {
    season.value--;
  }

  await getStandingsForSeason(season.value);
}

// Fetch standings for selected season
async function getStandingsForSeason(season?: number) {
  if(!season) return;

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
