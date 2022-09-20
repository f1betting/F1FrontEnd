<template>
  <div class="w-screen h-screen bg-blue-600 flex justify-center place-items-center">
    <div id="buttonDiv"></div>
  </div>
</template>

<script setup lang="ts">
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function handleCredentialResponse(response: any) {
  console.log(response);
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback:  handleCredentialResponse
  });
  google.accounts.id.renderButton(
      document.getElementById("buttonDiv")!,
      { theme: "outline", size: "large", type: "standard" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};
</script>

<style scoped>

</style>
