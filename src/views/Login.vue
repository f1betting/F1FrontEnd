<template>
  <div class="w-screen h-screen bg-off-white flex justify-center place-items-center">
    <Card class="justify-between place-items-center py-10">
      <div>
        <img src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-5-3.png"
            alt="F1 LOGO"
            class="w-full h-auto brightness-0 invert">
        <h1 class="text-center text-4xl font-bold">F1 BETTING</h1>
      </div>
      <div class="flex flex-col place-items-center gap-4">
        <SignInButton />
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import SignInButton from "../components/SignInButton.vue";
import Card         from "../components/Card.vue";
</script>

<style scoped>

</style>
