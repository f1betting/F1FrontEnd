<template>
  <Card class="place-items-center">
    <h1 class="font-bold text-3xl">UPCOMING</h1>
    <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xl">
      <h1 class="col-span-full text-center font-bold">{{ raceName }}</h1>
      <h1 class="font-bold text-right self-center">P1</h1>
      <input v-model="bet.p1" class="bg-red border-white border-2 p-1 text-xl uppercase">
      <h1 class="font-bold text-right self-center">P2</h1>
      <input v-model="bet.p2" class="bg-red border-white border-2 p-1 text-xl uppercase">
      <h1 class="font-bold text-right self-center">P3</h1>
      <input v-model="bet.p3" class="bg-red border-white border-2 p-1 text-xl uppercase">
    </div>

    <Button class="mt-5"
        @click="createBet"
        v-if="!betExists">BET
    </Button>

    <Button class="mt-5"
        @click="updateBet"
        v-if="betExists">UPDATE
    </Button>

    <Button class="mt-5"
        @click="deleteBet"
        v-if="betExists">DELETE
    </Button>
  </Card>
</template>

<script setup lang="ts">
import Card                   from "../components/Card.vue";
import Button                 from "../components/Button.vue";
import { useUserStore }       from "../store/userInfo";
import { onBeforeMount, ref } from "vue";
import { Bet, NextRace }      from "../typings/typings";
import axios                  from "axios";

const emptyBet = {
  p1:       "",
  p2:       "",
  p3:       "",
  points:   -1,
  round:    -1,
  username: "",
  raceName: ""
};

const userStore = useUserStore();
const bet       = ref<Bet>(emptyBet);
const betExists = ref<boolean>(false);
const raceName  = ref<String>();

async function getNextBet() {
  const nextRace = await axios.get(`${ import.meta.env.VITE_F1_API_URL }/event/next`);
  const raceData = <NextRace>nextRace.data;

  const season = raceData.season;
  const round  = raceData.round;

  const eventRes = await axios.get(`${ import.meta.env.VITE_F1_API_URL }/event/${ season }/${ round }`);

  raceName.value = eventRes.data.raceName;

  try {
    const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/bet/${ round }`, {
      headers: {
        "Authorization": `Bearer ${ userStore.token }`
      }
    });

    bet.value       = res.data;
    betExists.value = true;
  }
  catch {
    console.error("Bet not found");
    bet.value       = emptyBet;
    betExists.value = false;
  }
}

async function updateBet() {
  const nextRace = await axios.get(`${ import.meta.env.VITE_F1_API_URL }/event/next`);
  const raceData = <NextRace>nextRace.data;

  const season = raceData.season;
  const round  = raceData.round;

  try {
    await axios({
      method:  "put",
      url:     `${ import.meta.env.VITE_BETTING_API_URL }/bet/${ round }?season=${ season }&p1=${ bet.value.p1 }&p2=${ bet.value.p2 }&p3=${ bet.value.p3 }`,
      headers: {
        "Authorization": `Bearer ${ userStore.token }`
      }
    });
  }
  catch {
    console.error("Driver code incorrect");
  }

  await getNextBet();
}

async function createBet() {
  await axios({
    method:  "post",
    url:     `${ import.meta.env.VITE_BETTING_API_URL }/bet`,
    data:    {
      p1: bet.value.p1,
      p2: bet.value.p2,
      p3: bet.value.p3
    },
    headers: {
      "Authorization": `Bearer ${ userStore.token }`
    }
  });

  await getNextBet();
}

async function deleteBet() {
  const nextRace = await axios.get(`${ import.meta.env.VITE_F1_API_URL }/event/next`);
  const raceData = <NextRace>nextRace.data;

  const round = raceData.round;

  await axios({
    method:  "delete",
    url:     `${ import.meta.env.VITE_BETTING_API_URL }/bet/${ round }`,
    headers: {
      "Authorization": `Bearer ${ userStore.token }`
    }
  });

  await getNextBet();
}

onBeforeMount(async () => {
  await getNextBet();
});
</script>

<style scoped>

</style>
