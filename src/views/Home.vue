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

      <Button class="mt-5"
          @click="signOut"
          v-if="userStore.id.sub">SIGN OUT
      </Button>
    </div>
  </div>

  <div class="w-screen h-screen bg-off-white flex justify-center place-items-center">
    <BetCard></BetCard>
  </div>
</template>

<script setup lang="ts">
import BetCard           from "../components/BetCard.vue";
import Button            from "../components/Button.vue";
import { useUserStore }  from "../store/userInfo";
import { onBeforeMount } from "vue";
import { useRouter }     from "vue-router";
import axios             from "axios";

const router    = useRouter();
const userStore = useUserStore();


async function fetchUserData() {
  if (!userStore.id.name) return;

  const username = <string>userStore.id.name;

  const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/users/${ username.toLowerCase() }`);

  userStore.userdata = res.data;
}

function signOut() {
  userStore.id = {};
  router.push("/login");
}

onBeforeMount(async () => {
  await fetchUserData();
});
</script>

<style scoped>

</style>
