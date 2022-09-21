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

    <Card class="justify-between py-10" v-if="userStore.id.sub">
      <img :src="userStore.id.picture"
          alt="PROFILE PICTURE"
          class="w-24 h-auto place-self-center rounded-full drop-shadow-xl">

      <div class="text-center">
        <h1 class="font-bold">{{ userStore.id.name }}</h1>
        <h1 class="font-bold">{{ userStore.id.sub }}</h1>
        <h1 class="font-bold">{{ userStore.id.email }}</h1>
      </div>

      <button class="w-full bg-off-white text-black" @click="signOut">Sign out</button>
    </Card>
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
