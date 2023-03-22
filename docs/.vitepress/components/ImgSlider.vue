<template>
  <div class="img-slider">
    <Swiper :modules="modules" autoplay>
      <template v-for="{ src, alt } of imgSliderList" :key="src">
        <SwiperSlide>
          <img :src="src" :alt="alt" />
        </SwiperSlide>
      </template>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { ImgSliderList } from '../types'
import 'swiper/css'

defineProps({
  imgSliderList: {
    type: Object as PropType<ImgSliderList>,
    required: true
  }
})

const modules = [Autoplay]
</script>
