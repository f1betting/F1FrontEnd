<template>
  <div class="w-screen h-screen bg-blue-600 flex justify-center place-items-center">
    <!--    <div id="g_id_onload"-->
    <!--        :data-client_id="CLIENT_ID"-->
    <!--        data-context="use"-->
    <!--        data-ux_mode="popup"-->
    <!--        :data-callback="log"-->
    <!--        data-auto_select="true"-->
    <!--        data-itp_support="true">-->
    <!--    </div>-->

    <!--    <div class="g_id_signin"-->
    <!--        data-type="standard"-->
    <!--        data-shape="pill"-->
    <!--        data-theme="filled_black"-->
    <!--        data-text="continue_with"-->
    <!--        data-size="large"-->
    <!--        data-logo_alignment="left">-->
    <!--    </div>-->
    <div id="buttonDiv"></div>
  </div>
</template>

<script setup lang="ts">
/// <reference types="google.accounts" />
import { onMounted } from "vue";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const BASE_URL  = import.meta.env.BASE_URL;

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
