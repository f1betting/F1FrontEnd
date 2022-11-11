<template>
  <SideBar></SideBar>

  <div class="max-w-screen h-screen phone:h-full flex justify-center
    place-items-center phone:py-10 small:py-10" :class="userStore.guest ? 'small:h-screen' : 'small:h-full'">
    <div class="flex flex-row phone:flex-col small:flex-col gap-8">
      <BetCard v-show="userStore.id.sub"></BetCard>
      <StandingsCard></StandingsCard>
      <PreviousResultCard v-show="userStore.id.sub"></PreviousResultCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import StandingsCard from "../components/StandingsCard.vue";
import BetCard from "../components/BetCard.vue";
import PreviousResultCard from "../components/PreviousResultCard.vue";
import { useUserStore } from "../store/userInfo";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import SideBar from "../components/SideBar.vue";
import { F1Client } from "../client/f1";
import { BettingClient } from "../client/betting";

const userStore = useUserStore();
const season = ref();

// Initialize API clients
const f1Client = new F1Client({
  BASE: `${ import.meta.env.VITE_F1_API_URL }`
});

const bettingClient = new BettingClient({
  BASE: `${ import.meta.env.VITE_BETTING_API_URL }`
});

// Fetch the userdata
async function fetchUserData() {
  if (!userStore.id.name) {
    return;
  }

  // Cast for type safety
  const username = userStore.id.name as string;
  const uuid = userStore.id.sub as string;

  // Fetch next race
  const nextRace = await f1Client.events.getNextRace();

  season.value = nextRace.season;
  const round = nextRace.round;

  // Select previous season if round is 1
  if (round <= 1) {
    season.value--;
  }

  try {
    // Fetch userdata
    const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/users/${ uuid }`);

    // Store userdata
    userStore.userdata = res.data;

    // Store points for the correct season
    userStore.userdata.points = res.data[`points_${ season.value }`];
  } catch {
    // Create new user if no user is found
    bettingClient.users.createUser({
      username: username.toLowerCase(),
      uuid: uuid
    });
  }
}

onBeforeMount(async () => {
  await fetchUserData();
});
</script>

<style>
body {
  background-color: var(--off-white);
}
</style>
