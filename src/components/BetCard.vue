<template>
  <Card class="place-items-center">
    <h1 class="font-bold text-3xl">UPCOMING</h1>
    <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xl">
      <h1 class="col-span-full text-center font-bold">{{ raceName }}</h1>
      <h1 class="font-bold text-right self-center">P1</h1>
      <select
          v-model="bet.p1"
          class="bg-red border-white border-2 p-1 text-xl uppercase rounded-md lg:appearance-none small:appearance-none">
        <option v-for="driverCode in driverCodes" class="lg:hidden small:hidden">{{ driverCode }}</option>
      </select>
      <h1 class="font-bold text-right self-center">P2</h1>
      <select
          v-model="bet.p2"
          class="bg-red border-white border-2 p-1 text-xl uppercase rounded-md lg:appearance-none small:appearance-none">
        <option v-for="driverCode in driverCodes" class="lg:hidden small:hidden">{{ driverCode }}</option>
      </select>
      <h1 class="font-bold text-right self-center">P3</h1>
      <select
          v-model="bet.p3"
          class="bg-red border-white border-2 p-1 text-xl uppercase rounded-md lg:appearance-none small:appearance-none">
        <option v-for="driverCode in driverCodes" class="lg:hidden small:hidden">{{ driverCode }}</option>
      </select>
    </div>

    <Button class="mt-5"
        @click="createBet"
        v-if="!betExists">
      BET
    </Button>

    <Button class="mt-5"
        @click="updateBet"
        v-if="betExists">
      UPDATE
    </Button>

    <Button class="mt-5"
        @click="deleteBet"
        v-if="betExists">
      DELETE
    </Button>
  </Card>
</template>

<script setup lang="ts">
import Card                             from "../components/Card.vue";
import Button                           from "../components/Button.vue";
import { useUserStore }                 from "../store/userInfo";
import { onBeforeMount, reactive, ref } from "vue";
import { F1Client }                     from "../client/f1";
import { BettingClient, FullBet }       from "../client/betting";

const emptyBet = {
  p1:     "",
  p2:     "",
  p3:     "",
  uuid:   "",
  points: -1,
  round:  -1,
  season: -1
};

const driverCodes = reactive<Array<string>>([]);
const userStore   = useUserStore();
const bet         = ref<FullBet>(emptyBet);
const betExists   = ref<boolean>(false);
const raceName    = ref<String>();

const f1Client = new F1Client({
  BASE: `${ import.meta.env.VITE_F1_API_URL }`,
});

const bettingClient = new BettingClient({
  BASE:  `${ import.meta.env.VITE_BETTING_API_URL }`,
  TOKEN: userStore.token
});

async function getNextBet() {
  const nextRace = await f1Client.events.getNextRace();

  const season = nextRace.season;
  const round  = nextRace.round;

  const event = await f1Client.events.getEventDetails(season, round);

  raceName.value = event.raceName;

  try {
    bet.value = await bettingClient.bet.getBet(round);

    betExists.value = true;
  }
  catch {
    console.error("Bet not found");
    bet.value       = emptyBet;
    betExists.value = false;

    bet.value.season = season;
    bet.value.round  = round;
  }
}

async function updateBet() {
  const nextRace = await f1Client.events.getNextRace();

  const season = nextRace.season;
  const round  = nextRace.round;

  try {
    await bettingClient.bet.editBet(round, season, bet.value.p1, bet.value.p2, bet.value.p3);
  }
  catch {
    console.error("Driver code incorrect");
  }

  await getNextBet();
}

async function createBet() {
  await bettingClient.bet.createBet({
    p1: bet.value.p1,
    p2: bet.value.p2,
    p3: bet.value.p3
  });

  await getNextBet();
}

async function deleteBet() {
  const nextRace = await f1Client.events.getNextRace();

  const round = nextRace.round;

  await bettingClient.bet.deleteBet(round);

  await getNextBet();
}

async function populateDataList() {
  const driversData = await f1Client.drivers.getDriversBySeason(bet.value.season);

  driversData.drivers.forEach(driver => {
    driverCodes.push(driver.code ?? "ERR");
  });
}

onBeforeMount(async () => {
  await getNextBet();
  await populateDataList();
});
</script>

<style scoped>

</style>
