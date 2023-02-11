<template>
  <div class="img-slider">
    <Carousel :autoplay="2000" :wrap-around="true">
      <Slide v-for="{ src, alt } of imgSliderList" :key="src">
        <img class="carousel__item" :src="src" :alt="alt" />
      </Slide>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import type { ImgSliderList } from '../types'

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

defineProps({
  imgSliderList: {
    type: Object as PropType<ImgSliderList>,
    required: true
  }
})
</script>

<style scoped>
.carousel__item {
  width: 90%;
}
</style>
