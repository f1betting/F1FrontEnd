<template>
  <div class="bg-red w-64 h-screen p-5 absolute left-0 flex flex-col place-items-center text-white drop-shadow-2xl">
    <div v-if="userStore.id.sub" class="flex flex-col place-items-center gap-4">
      <img :src="userStore.id.picture"
          alt="PROFILE PICTURE"
          class="w-24 h-auto rounded-full drop-shadow-xl">

      <div class="text-white">
        <h1 class="font-bold">Name: {{ userStore.id.name }}</h1>
        <h1 class="font-bold">Points: {{ userStore.userdata.points }}</h1>
      </div>
    </div>

    <div class="absolute bottom-0 p-5 text-white">
      <img src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-5-3.png"
          alt="F1 LOGO"
          class="w-full h-auto brightness-0 invert">
      <h1 class="text-center text-4xl font-bold">F1 BETTING</h1>

      <button class="w-full bg-white text-red text-2xl rounded-md drop-shadow-lg font-bold mt-5"
          @click="signOut"
          v-if="userStore.id.sub">SIGN OUT
      </button>
    </div>
  </div>

  <div class="w-screen h-screen bg-off-white flex justify-center place-items-center">
    <Card class="text-white place-items-center">
      <h1 class="font-bold text-3xl">UPCOMING BET</h1>
      <div class="grid grid-cols-2 gap-x-4 text-xl">
        <h1 class="font-bold text-right">Round</h1>
        <h1>{{ betStore.bet.round }}</h1>
        <h1 class="font-bold text-right">P1</h1>
        <h1>{{ betStore.bet.p1 }}</h1>
        <h1 class="font-bold text-right">P2</h1>
        <h1>{{ betStore.bet.p2 }}</h1>
        <h1 class="font-bold text-right">P3</h1>
        <h1>{{ betStore.bet.p3 }}</h1>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card             from "../components/Card.vue";
import { useUserStore } from "../store/userInfo";
import { useBetStore }  from "../store/bet";
import { onMounted }    from "vue";
import { useRouter }    from "vue-router";
import axios            from "axios";

const router    = useRouter();
const userStore = useUserStore();
const betStore  = useBetStore();

async function fetchUserData() {
  if (!userStore.id.name) return;

  const username = <string>userStore.id.name;

  const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/users/${ username.toLowerCase() }`);

  userStore.userdata = res.data;
}

async function getNextBet() {
  const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/bet/17`, {
    headers: {
      "Authorization": `Bearer ${ userStore.token }`
    }
  });

  betStore.bet = res.data;
}

function signOut() {
  userStore.id = {};
  router.push("/login");
}

onMounted(async () => {
  await fetchUserData();
  await getNextBet();
});
</script>

<style scoped>

</style>
