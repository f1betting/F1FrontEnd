<template>
  <SideBar></SideBar>

  <div class="w-screen h-screen phone:h-full flex justify-center
    place-items-center phone:py-10 small:py-10" :class="userStore.guest ? 'small:h-screen' : 'small:h-full'">
    <div class="flex flex-row phone:flex-col small:flex-col gap-8">
      <BetCard v-show="userStore.id.sub"></BetCard>
      <StandingsCard></StandingsCard>
      <PreviousResultCard v-show="userStore.id.sub"></PreviousResultCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import StandingsCard          from "../components/StandingsCard.vue";
import BetCard                from "../components/BetCard.vue";
import PreviousResultCard     from "../components/PreviousResultCard.vue";
import { useUserStore }       from "../store/userInfo";
import { onBeforeMount, ref } from "vue";
import axios                  from "axios";
import SideBar                from "../components/SideBar.vue";
import { F1Client }           from "../client/f1";
import { BettingClient }      from "../client/betting";

const userStore = useUserStore();
const season    = ref();

const f1Client = new F1Client({
  BASE: `${ import.meta.env.VITE_F1_API_URL }`,
});

const bettingClient = new BettingClient({
  BASE: `${ import.meta.env.VITE_BETTING_API_URL }`,
});

async function fetchUserData() {
  if (!userStore.id.name) return;

  const username = <string>userStore.id.name;
  const uuid     = <string>userStore.id.sub;

  const nextRace = await f1Client.events.getNextRace();

  season.value = nextRace.season;
  const round  = nextRace.round;

  if (round <= 1) {
    season.value--;
  }

  try {
    const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/users/${ uuid }`);

    userStore.userdata = res.data;

    userStore.userdata.points = res.data[`points_${ season.value }`];
  }
  catch {
    bettingClient.users.createUser({
      username: username.toLowerCase(),
      uuid:     uuid
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
