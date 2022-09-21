<template>
  <div id="buttonDiv"></div>
</template>

<script setup lang="ts">
import { decodeJwt } from "jose";
import { userStore } from "../store/userInfo";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function handleCredentialResponse(response: any) {
  const responsePayload = decodeJwt(response.credential);
  if (!responsePayload.sub) return;

  console.log("ID: " + responsePayload.sub);
  console.log("Full Name: " + responsePayload.name);
  console.log("Given Name: " + responsePayload.given_name);
  console.log("Family Name: " + responsePayload.family_name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email);

  userStore.id = decodeJwt(response.credential);
}
window.onload = function () {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback:  handleCredentialResponse
  });
  google.accounts.id.renderButton(
      document.getElementById("buttonDiv")!,
      { theme: "outline", size: "large", type: "standard", shape: "rectangular", text: "continue_with" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};
</script>

<style scoped>

</style>
