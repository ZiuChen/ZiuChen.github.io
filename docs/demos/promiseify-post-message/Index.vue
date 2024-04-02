<template>
  <div class="home">
    <h2>Home</h2>
    <iframe ref="iframeRef" src="/demos/promiseify-post-message/inner" frameborder="0" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { registerBase } from './base'

const iframeRef = ref<HTMLIFrameElement | null>(null)

onMounted(() => {
  if (iframeRef.value && iframeRef.value.contentWindow) {
    registerBase(iframeRef.value.contentWindow)
  }
})
</script>

<style scoped>
/* 隐藏掉窄屏时 fixd 在顶部的 Return to top */
:global(.VPLocalNav) {
  display: none;
}

.home {
  padding: 25px;
}

iframe {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
</style>
