<template>
  <div class="bg-red w-64 h-screen py-5 absolute left-0 flex flex-col place-items-center
    text-white drop-shadow-2xl phone:w-full phone:h-64 phone:relative phone:justify-center small:fixed">
    <div v-if="userStore.id.sub" class="flex flex-col place-items-center gap-4">
      <img :src="userStore.id.picture"
           alt="PROFILE PICTURE"
           class="w-24 h-auto rounded-full drop-shadow-xl">

      <div class="text-white text-center text-xl">
        <h1 class="font-bold">{{ userStore.id.name }}</h1>
        <h1 class="font-bold">Points: {{ userStore.userdata.points }}</h1>
      </div>

      <Button class="mt-5 self-center small:hidden lg:hidden"
              @click="signOut"
              v-if="userStore.id.sub">
        SIGN OUT
      </Button>
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

      <Button class="mt-5 self-center"
              @click="signIn"
              v-if="!userStore.id.sub">
        SIGN IN
      </Button>
    </div>

    <div class="absolute bottom-0 p-5 text-white flex flex-col" v-if="userStore.guest">
      <img src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-5-3.png"
           alt="F1 LOGO"
           class="w-64 h-auto brightness-0 invert">
      <h1 class="text-center text-4xl font-bold">F1 BETTING</h1>

      <Button class="mt-5 self-center"
              @click="signIn"
              v-if="!userStore.id.sub">
        SIGN IN
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../components/Button.vue";
import { useUserStore } from "../store/userInfo";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

function signOut() {
  // Clear store
  userStore.id = {};
  userStore.guest = true;
}

function signIn() {
  router.push("/login");
}
</script>

<style scoped>

</style>
