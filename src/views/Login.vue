<template>
  <div class="w-screen h-screen flex justify-center place-items-center">
    <Card class="justify-between place-items-center py-10">
      <div>
        <img src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-5-3.png"
             alt="F1 LOGO"
             class="w-full h-auto brightness-0 invert">
        <h1 class="text-center text-4xl font-bold">F1 BETTING</h1>
      </div>
      <div class="flex flex-col place-items-center gap-4">
        <SignInButton/>
        <a class="underline" @click="signInAsGuest()">Continue as guest</a>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import SignInButton from "../components/SignInButton.vue";
import Card from "../components/Card.vue";
import { useUserStore } from "../store/userInfo";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();


function signInAsGuest() {
  userStore.guest = true;
  router.push("/");
}
</script>

<style scoped>

</style>
