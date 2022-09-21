<template>
  <div class="w-screen h-screen bg-off-white flex justify-center place-items-center">
    <Card class="justify-between place-items-center py-10" v-show="!userStore.id.sub">
      <div>
        <img src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-5-3.png"
            alt="F1 LOGO"
            class="w-full h-auto brightness-0 invert">
        <h1 class="text-center text-4xl font-bold">F1 BETTING</h1>
      </div>
      <SignInButton />
    </Card>

    <div class="bg-red w-64 h-screen p-5 absolute left-0 flex flex-col place-items-center text-white drop-shadow-2xl"
        v-if="userStore.id.sub">
      <img :src="userStore.id.picture"
          alt="PROFILE PICTURE"
          class="w-24 h-auto rounded-full drop-shadow-xl">

      <div class="text-white">
        <h1 class="font-bold">{{ userStore.id.name }}</h1>
        <h1 class="font-bold">{{ userStore.id.sub }}</h1>
        <h1 class="font-bold">{{ userStore.id.email }}</h1>
      </div>

      <div class="absolute bottom-0 p-5 text-white">
        <img src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-5-3.png"
            alt="F1 LOGO"
            class="w-full h-auto brightness-0 invert">
        <h1 class="text-center text-4xl font-bold">F1 BETTING</h1>

        <button class="w-full bg-white text-red text-2xl rounded-md drop-shadow-lg font-bold mt-5"
            @click="signOut">SIGN OUT
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "./store/userInfo";
import SignInButton  from "./components/SignInButton.vue";
import Card          from "./components/Card.vue";

function signOut() {
  userStore.id = {};
}
</script>

<style scoped>

</style>
