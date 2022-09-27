<template>
  <Card class="place-items-center">
    <h1 class="font-bold text-3xl">PREVIOUS</h1>
    <div class="grid grid-cols-3 gap-x-4 gap-y-1 text-xl">
      <h1 class="col-span-full text-center font-bold">{{ raceName }}</h1>

      <h1 class="font-bold text-center self-center col-span-2">Points</h1>
      <h1 class="text-xl uppercase">{{ bet.points }}</h1>

      <h1 class="font-bold text-right self-center">P1</h1>
      <h1 class="text-xl text-center uppercase">{{ bet.p1 }}</h1>
      <h1 class="text-left">(+{{ bet.p1 === raceTop3.p1 ? 3 : 0 }})</h1>

      <h1 class="font-bold text-right self-center">P2</h1>
      <h1 class="text-xl text-center uppercase">{{ bet.p2 }}</h1>
      <h1 class="text-left">(+{{ bet.p2 === raceTop3.p2 ? 2 : 0 }})</h1>

      <h1 class="font-bold text-right self-center">P3</h1>
      <h1 class="text-xl text-center uppercase">{{ bet.p3 }}</h1>
      <h1 class="text-left">(+{{ bet.p3 === raceTop3.p3 ? 1 : 0 }})</h1>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card                       from "../components/Card.vue";
import { useUserStore }           from "../store/userInfo";
import { onBeforeMount, ref }     from "vue";
import { F1Client }               from "../client/f1";
import { BettingClient, FullBet } from "../client/betting";

const emptyBet = {
  p1:     "",
  p2:     "",
  p3:     "",
  uuid:   "",
  points: -1,
  round:  -1,
  season: -1
};

const emptyTop3 = {
  p1: "",
  p2: "",
  p3: ""
};

const userStore = useUserStore();
const bet       = ref<FullBet>(emptyBet);
const raceTop3  = ref(emptyTop3);
const raceName  = ref<String>();

const f1Client = new F1Client({
  BASE: `${ import.meta.env.VITE_F1_API_URL }`,
});

const bettingClient = new BettingClient({
  BASE:  `${ import.meta.env.VITE_BETTING_API_URL }`,
  TOKEN: userStore.token
});

async function getBet() {
  const nextRace = await f1Client.events.getNextRace();

  const season = nextRace.season;
  const round  = nextRace.round - 1;

  const event = await f1Client.events.getEventDetails(season, round);

  raceName.value = event.raceName;

  try {
    bet.value = await bettingClient.bet.getBet(round);
  }
  catch {
    console.error("Bet not found");
    bet.value = emptyBet;
  }

  const raceResults = await f1Client.results.getRaceResults(season, round);

  raceTop3.value = {
    p1: raceResults.results[0].Driver.code ?? "ERR",
    p2: raceResults.results[1].Driver.code ?? "ERR",
    p3: raceResults.results[2].Driver.code ?? "ERR"
  };
}

onBeforeMount(async () => {
  await getBet();
});
</script>

<style scoped>

</style>
