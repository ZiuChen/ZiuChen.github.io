<template>
  <div class="title">
    <img :src="logo" alt="logo" style="margin: 0 auto" />
    <p style="text-align: center">{{ subTitle }}</p>
    <template v-for="item of linkList" :key="item.content">
      <Link :c="item.content" :t="item.target" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import type { LinkList } from '../types'
import Link from './Link.vue'

const props = defineProps({
  subTitle: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  linkList: {
    type: Array as PropType<LinkList>,
    required: true
  }
})
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
