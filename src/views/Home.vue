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
import StandingsCard      from "../components/StandingsCard.vue";
import BetCard            from "../components/BetCard.vue";
import PreviousResultCard from "../components/PreviousResultCard.vue";
import { useUserStore }   from "../store/userInfo";
import { onBeforeMount }  from "vue";
import { useRouter }      from "vue-router";
import axios              from "axios";
import SideBar            from "../components/SideBar.vue";

const router    = useRouter();
const userStore = useUserStore();


async function fetchUserData() {
  if (!userStore.id.name) return;

  const username = <string>userStore.id.name;
  const uuid     = <string>userStore.id.sub;

  try {
    const res = await axios.get(`${ import.meta.env.VITE_BETTING_API_URL }/users/${ uuid }`);

    userStore.userdata = res.data;
  }
  catch {
    await axios.post(`${ import.meta.env.VITE_BETTING_API_URL }/users`, {
      "username": username.toLowerCase(),
      "uuid":     uuid
    });
  }
}

function signOut() {
  userStore.id = {};
  router.push("/login");
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
