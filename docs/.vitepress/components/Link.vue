<template>
  <a class="link" href="javascript:;" @click="handleClick"> {{ c }}</a>
</template>

<script setup lang="ts">
import { useRouter } from 'vitepress'

const router = useRouter()
const props = defineProps({
  c: {
    type: String,
    required: true
  },
  t: {
    type: String,
    required: true
  }
})
const handleClick = () => {
  // if link is external, open in new tab
  if (props.t.startsWith('http')) {
    window.open(props.t, '_blank')
  } else if (props.t.endsWith('/')) {
    // add link to path
    // @ts-ignore
    window && window.location && (window.location = props.t)
  } else {
    router.go(props.t)
  }
}
</script>

<style scoped>
.link {
  margin: 0px 5px;
}
</style>
