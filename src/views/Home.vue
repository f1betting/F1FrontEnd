<template>
  <div class="bg-off-white">
    <div class="bg-red w-64 h-screen p-5 absolute left-0 flex flex-col place-items-center
    text-white drop-shadow-2xl phone:w-screen phone:h-64 phone:relative phone:justify-center small:fixed">
      <div v-if="userStore.id.sub" class="flex flex-col place-items-center gap-4">
        <img :src="userStore.id.picture"
            alt="PROFILE PICTURE"
            class="w-24 h-auto rounded-full drop-shadow-xl">

        <div class="text-white text-center text-xl">
          <h1 class="font-bold">{{ userStore.id.name }}</h1>
          <h1 class="font-bold">Points: {{ userStore.userdata.points }}</h1>
        </div>
      </div>

      <div class="absolute bottom-0 p-5 text-white flex flex-col phone:hidden">
        <img src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-5-3.png"
            alt="F1 LOGO"
            class="w-64 h-auto brightness-0 invert">
        <h1 class="text-center text-4xl font-bold">F1 BETTING</h1>

        <Button class="mt-5 self-center"
            @click="signOut"
            v-if="userStore.id.sub">
          SIGN OUT
        </Button>
      </div>
    </div>

    <div class="w-screen h-screen phone:h-full small:h-full flex justify-center
    place-items-center phone:py-10 small:py-10">
      <div class="flex flex-row phone:flex-col small:flex-col gap-8">
        <BetCard></BetCard>
        <StandingsCard></StandingsCard>
        <PreviousResultCard></PreviousResultCard>

        <Button class="w-full hidden phone:block"
            @click="signOut"
            v-if="userStore.id.sub">
          SIGN OUT
        </Button>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import StandingsCard      from "../components/StandingsCard.vue";
import BetCard            from "../components/BetCard.vue";
import PreviousResultCard from "../components/PreviousResultCard.vue";
import Button             from "../components/Button.vue";
import { useUserStore }   from "../store/userInfo";
import { onBeforeMount }  from "vue";
import { useRouter }      from "vue-router";
import axios              from "axios";

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

<style scoped>

</style>
