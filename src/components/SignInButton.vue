<template>
  <div id="buttonDiv"></div>
</template>

<script setup lang="ts">
import { decodeJwt }    from "jose";
import { useUserStore } from "../store/userInfo";
import { useRouter }    from "vue-router";
import { onMounted }    from "vue";

const userStore = useUserStore();
const router    = useRouter();

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function handleCredentialResponse(response: any) {
  const responsePayload = decodeJwt(response.credential);
  if (!responsePayload.sub) return;

  userStore.id    = decodeJwt(response.credential);
  userStore.token = response.credential;
  userStore.guest = false;

  router.push("/");
}

onMounted(() => {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback:  handleCredentialResponse
  });
  google.accounts.id.renderButton(
      document.getElementById("buttonDiv")!,
      { theme: "outline", size: "large", type: "standard", shape: "rectangular", text: "continue_with" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
});
</script>

<style scoped>

</style>
