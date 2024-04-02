<template>
  <div class="inner">
    <h2>Inner</h2>
    <button @click="getUserToken('123456')">getUserToken: {{ userToken }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { registerSdk, postMessage } from './sdk'

registerSdk()

const userToken = ref('')

async function getUserToken(userId: string) {
  const token = await postMessage({
    namespace: 'user',
    action: 'getUserToken',
    payload: {
      userId
    }
  })

  if (token) {
    userToken.value = token as string
  }
}
</script>

<style scoped>
/* 隐藏掉窄屏时 fixd 在顶部的 Return to top */
:global(.VPLocalNav) {
  display: none;
}

.inner {
  padding: 25px;
}
</style>
