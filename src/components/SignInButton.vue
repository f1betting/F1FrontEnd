<template>
  <div id="buttonDiv"></div>
</template>

<script setup lang="ts">
import { decodeJwt } from "jose";
import { useUserStore } from "../store/userInfo";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const userStore = useUserStore();
const router = useRouter();

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function handleCredentialResponse(response: any) {
  // Decode JWT
  const responsePayload = decodeJwt(response.credential);
  if (!responsePayload.sub) {
    return;
  }

  // Store userdata in userStore
  userStore.id = responsePayload;
  userStore.token = response.credential;
  userStore.guest = false;

  router.push("/");
}

onMounted(() => {
  let interval = setInterval(() => {
    if(google) {
      clearInterval(interval)
      // Initialize Google application
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
      });
      // Render "continue with Google" button
      google.accounts.id.renderButton(
          document.getElementById("buttonDiv")!,
          { theme: "outline", size: "large", type: "standard", shape: "rectangular", text: "continue_with" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  }, 200)
});
</script>

<style scoped>

</style>
