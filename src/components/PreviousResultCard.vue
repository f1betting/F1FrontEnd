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
import Card                          from "../components/Card.vue";
import { useUserStore }              from "../store/userInfo";
import { onBeforeMount, ref }        from "vue";
import { Bet, NextRace, raceResult } from "../typings/typings";
import axios                         from "axios";

const emptyBet = {
  p1:       "",
  p2:       "",
  p3:       "",
  points:   -1,
  round:    -1,
  season:   -1,
  username: "",
  raceName: ""
};

const emptyTop3 = {
  p1: "",
  p2: "",
  p3: ""
};

const userStore = useUserStore();
const bet       = ref<Bet>(emptyBet);
const raceTop3  = ref(emptyTop3);
const raceName  = ref<String>();

async function getBet() {
  const nextRace = await axios.get(`${ import.meta.env.VITE_F1_API_URL }/event/next`);
  const raceData = <NextRace>nextRace.data;

  const season = raceData.season;
  const round  = raceData.round - 1;

  const eventRes = await axios.get(`${ import.meta.env.VITE_F1_API_URL }/event/${ season }/${ round }`);

  raceName.value = eventRes.data.raceName;

  try {
    const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/bet/${ round }`, {
      headers: {
        "Authorization": `Bearer ${ userStore.token }`
      }
    });

    bet.value = res.data;
  }
  catch {
    console.error("Bet not found");
    bet.value = emptyBet;
  }

  const raceRes     = await axios.get(`${ import.meta.env.VITE_F1_API_URL }/results/race/${ season }/${ round }`);
  const raceResults = <Array<raceResult>>raceRes.data.results;

  raceTop3.value = {
    p1: raceResults[0].Driver.code,
    p2: raceResults[1].Driver.code,
    p3: raceResults[2].Driver.code
  };
}


onBeforeMount(async () => {
  await getBet();
});
</script>

<style scoped>

</style>
